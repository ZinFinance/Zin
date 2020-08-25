import axios from "axios";
import crypto from "crypto";
import * as ActionTypes from "../constants";

// These parameters should be used for all requests
const SUMSUB_APP_TOKEN = process.env.REACT_APP_SUMSUB_APP_TOKEN;
const SUMSUB_SECRET_KEY = process.env.REACT_APP_SUMSUB_SECRET_KEY;
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
export const SUMSUB_BASE_URL = "https://api.sumsub.com";
const REQUEST_URL = CORS_PROXY_URL + SUMSUB_BASE_URL;

var config = {};
config.baseURL = REQUEST_URL;

// This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens
function createSignature(config) {
  var ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data) {
    signature.update(config.data);
  }

  config.headers["X-App-Access-Ts"] = ts;
  config.headers["X-App-Access-Sig"] = signature.digest("hex");

  return config;
}

// https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
function createAccessToken(externalUserId, ttlInSecs = 600) {
  var method = "post";
  var url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}`;

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;
  config = createSignature(config);

  return config;
}

async function getAccessToken(externalUserId) {
  //   let externalUserId =
  //     "random-JSToken-" + Math.random().toString(36).substr(2, 9);
  externalUserId = crypto
    .createHash("md5")
    .update(externalUserId)
    .digest("hex");
  let response = await axios(createAccessToken(externalUserId, 1200));
  return response.data.token;
}

export function getKYCAccessToken(externalUserId, callback) {
  return async (dispatch) => {
    try {
      let accessToken = await getAccessToken(externalUserId);
      dispatch({
        type: ActionTypes.SET_KYC_ACCESS_TOKEN,
        data: accessToken,
      });
      if (callback) {
        callback(accessToken);
      }
    } catch (err) {
      console.warn("error fetching kyc access token", err);
    }
  };
}

//https://developers.sumsub.com/api-reference/#getting-applicant-data
function getApplicantData(externalUserId) {
  var method = "get";
  externalUserId = crypto
    .createHash("md5")
    .update(externalUserId)
    .digest("hex");
  var url = `/resources/applicants/-;externalUserId=${externalUserId}/one`;

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  config = createSignature(config);
  return config;
}

// https://developers.sumsub.com/api-reference/#getting-applicant-status-sdk
function getApplicantStatus(applicantId) {
  var method = "get";
  var url = `/resources/applicants/${applicantId}/status`;

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;
  config = createSignature(config);

  return config;
}

export function getKYCApplicationStatus(externalUserId) {
  return async (dispatch) => {
    try {
      let applicationStatus = await getUserKYCStatus(externalUserId);
      dispatch({
        type: ActionTypes.SET_KYC_APPLICATION_STATUS,
        data: applicationStatus.data,
      });
    } catch (err) {
      console.warn("error fetching kyc application status", err);
    }
  };
}

export async function getUserKYCStatus(externalUserId) {
  try {
    let applicantData = await axios(getApplicantData(externalUserId));
    let applicationStatus = await axios(
      getApplicantStatus(applicantData.data.id)
    );
    return applicationStatus;
  } catch (err) {
    throw new Error(err);
  }
}
