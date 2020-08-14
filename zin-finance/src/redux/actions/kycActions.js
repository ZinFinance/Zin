import axios from "axios";
import crypto from "crypto";
import * as ActionTypes from "../constants";

// These parameters should be used for all requests
const SUMSUB_APP_TOKEN =
  "tst:nuJhopWJuLu0DtyHLzFvJBfu.gr9aUzPO0O64SYqqfmHn69oOMtpYwLWV";
const SUMSUB_SECRET_KEY = "X0WjbSEfmq4b82h9M08zkokym21692KO";
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
export const SUMSUB_BASE_URL = "https://test-api.sumsub.com"; // Don't forget to change when switching to production
const REQUEST_URL = CORS_PROXY_URL + SUMSUB_BASE_URL;

var config = {};
config.baseURL = REQUEST_URL;

// This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens
function createSignature(config) {
  console.log("Creating a signature for the request...");

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
  console.log("Creating an access token for initializng SDK...");

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
  console.log("External UserID: ", externalUserId);
  let response = await axios(createAccessToken(externalUserId, 1200));
  console.log("access token response", response.data);
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
      console.log("error fetching kyc access token", err);
    }
  };
}

//https://developers.sumsub.com/api-reference/#getting-applicant-data
function getApplicantData(externalUserId) {
  console.log("Getting the applicant status...");

  var method = "get";
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
  console.log("Getting the applicant status...");

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
      let applicantData = await axios(getApplicantData(externalUserId));
      console.log("kyc applicant data", applicantData.data);
      let applicationStatus = await axios(
        getApplicantStatus(applicantData.data.id)
      );
      console.log("kyc application status", applicationStatus.data);
      dispatch({
        type: ActionTypes.SET_KYC_APPLICATION_STATUS,
        data: applicationStatus.data,
      });
    } catch (err) {
      console.log("error fetching kyc application status", err);
    }
  };
}
