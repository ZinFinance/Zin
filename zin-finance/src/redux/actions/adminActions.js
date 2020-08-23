import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import EthService from "../../ethService";
import { getUserKYCStatus } from "./kycActions";

const DEFAULT_ERROR = "An error occurred. Please try again or contact support.";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://stgzinapi.azurewebsites.net";

const ethService = new EthService();

export function fetchUsers() {
  return async (dispatch) => {
    try {
      let users = await _fetchUsers();
      dispatch({
        type: ActionTypes.SET_USERS,
        data: users,
      });
      for (let user of users) {
        try {
          let kycApplicationStatus = await getUserKYCStatus(user.email);
          kycApplicationStatus = kycApplicationStatus.data;
          let kycStatus = "";
          if (kycApplicationStatus.reviewStatus === "completed") {
            if (kycApplicationStatus.reviewResult.reviewAnswer === "RED") {
              kycStatus = "rejected";
            } else {
              kycStatus = "approved";
            }
          } else if (
            kycApplicationStatus.reviewStatus === "pending" ||
            kycApplicationStatus.reviewStatus === "queued" ||
            kycApplicationStatus.reviewStatus === "onHold" ||
            kycApplicationStatus.reviewStatus === "init"
          ) {
            kycStatus = "pending";
          }
          dispatch({
            type: ActionTypes.SET_USER_KYC_STATUS,
            data: { userId: user.userId, kycStatus },
          });
        } catch (err) {
          dispatch({
            type: ActionTypes.SET_USER_KYC_STATUS,
            data: { userId: user.userId, kycStatus: "pending" },
          });
        }
      }
    } catch (err) {
      console.warn("error fetching users", err);
    }
  };
}

export function fetchUserTransactions(userId, callback) {
  return async (dispatch) => {
    try {
      let transactions = await _fetchUserTransactions(userId);
      dispatch({
        type: ActionTypes.SET_USER_TRANSACTIONS,
        data: transactions,
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      if (callback) {
        callback(err.message);
      }
    }
  };
}

export function fetchUserBonusTransactions(userId, callback) {
  return async (dispatch) => {
    try {
      let transactions = await _fetchUserBonusTransactions(userId);
      dispatch({
        type: ActionTypes.SET_USER_BONUS_TRANSACTIONS,
        data: transactions,
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      if (callback) {
        callback(err.message);
      }
    }
  };
}

async function _fetchUsers() {
  try {
    let response = await axios.get(API_URL + "/api/Profile/admin/allprofiles", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    let users = response.data.data;
    for (let i = 0; i < users.length; i++) {
      users[i].zinTokens = ethService.convertFromWei(users[i].zinTokens);
      users[i].referralZinTokens = ethService.convertFromWei(
        users[i].referralZinTokens
      );
      users[i].bonusZinTokens = ethService.convertFromWei(
        users[i].bonusZinTokens
      );
      users[i].presaleZinTokens = ethService.convertFromWei(
        users[i].presaleZinTokens
      );
    }
    if (response.status === 200) {
      return users;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.warn("error getting users info", err);
    throw new Error(DEFAULT_ERROR);
  }
}

async function _fetchUserTransactions(userId) {
  try {
    let response = await axios.get(
      API_URL + "/api/Profile/admin/getregisteredtxs",
      {
        params: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    let transactions = response.data.data;
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].amountTransferredInEther = ethService.convertFromWei(
        transactions[i].amountTransferredInEther
      );
      transactions[i].amountTransferredInToken = ethService.convertFromWei(
        transactions[i].amountTransferredInToken
      );
      transactions[i].referralZinTokensGenerated = ethService.convertFromWei(
        transactions[i].referralZinTokensGenerated
      );
      transactions[i].bonusZinTokensGenerated = ethService.convertFromWei(
        transactions[i].bonusZinTokensGenerated
      );
      transactions[i].presaleZinTokensGenerated = ethService.convertFromWei(
        transactions[i].presaleZinTokensGenerated
      );
    }
    if (response.status === 200) {
      return { userId, transactions };
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.warn("error getting user transactions", err);
    throw new Error(DEFAULT_ERROR);
  }
}

async function _fetchUserBonusTransactions(userId) {
  try {
    let response = await axios.get(API_URL + "/api/Profile/admin/getbonustxs", {
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    let transactions = response.data.data;
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].amountTransferredInEther = ethService.convertFromWei(
        transactions[i].amountTransferredInEther
      );
      transactions[i].amountTransferredInToken = ethService.convertFromWei(
        transactions[i].amountTransferredInToken
      );
      transactions[i].bonusTokensGenerated = ethService.convertFromWei(
        transactions[i].bonusTokensGenerated
      );
    }
    if (response.status === 200) {
      return { userId, transactions };
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.warn("error getting user transactions", err);
    throw new Error(DEFAULT_ERROR);
  }
}

export function fetchBonuses() {
  return async (dispatch) => {
    try {
      let bonuses = await _fetchBonuses();
      dispatch({
        type: ActionTypes.SET_BONUSES,
        data: bonuses,
      });
    } catch (err) {
      console.warn("fetching bonuses error", err);
    }
  };
}

async function _fetchBonuses() {
  try {
    let response = await axios.get(API_URL + "/api/Profile/admin/allbonus", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(DEFAULT_ERROR);
    }
  } catch (err) {
    throw new Error(DEFAULT_ERROR);
  }
}

export function updateBonus(bonusType, isActive, bonusPercentage, callback) {
  return async (dispatch) => {
    try {
      await _updateBonus(bonusType, isActive, bonusPercentage);
      dispatch({
        type: ActionTypes.UPDATE_BONUS,
        data: { bonusType, isActive, bonusPercentage },
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      if (callback) {
        callback(err.message);
      }
    }
  };
}

async function _updateBonus(bonusType, isActive, bonusPercentage) {
  try {
    let response = await axios.post(
      API_URL +
        `/api/Profile/admin/updatebonus/${bonusType}/${isActive}/${bonusPercentage}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(DEFAULT_ERROR);
    }
  } catch (err) {
    console.warn("update bonus error", err);
    throw new Error(DEFAULT_ERROR);
  }
}
