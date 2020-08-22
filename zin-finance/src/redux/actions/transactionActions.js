import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import EthService from "../../ethService";

const DEFAULT_ERROR = "An error occurred. Please try again or contact support.";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = CORS_PROXY + "https://stgzinapi.azurewebsites.net";

export function logoutUser() {
  Cookies.remove("token");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function fetchTransactions(callback) {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        API_URL + "/api/Profile/getregisteredtxs",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        let transactions = response.data.data;
        let ethService = new EthService();
        for (let i = 0; i < transactions.length; i++) {
          transactions[i].amountTransferredInEther = ethService.convertFromWei(
            transactions[i].amountTransferredInEther
          );
          transactions[i].amountTransferredInToken = ethService.convertFromWei(
            transactions[i].amountTransferredInToken
          );
          transactions[
            i
          ].referralZinTokensGenerated = ethService.convertFromWei(
            transactions[i].referralZinTokensGenerated
          );
          transactions[i].bonusZinTokensGenerated = ethService.convertFromWei(
            transactions[i].bonusZinTokensGenerated
          );
          transactions[i].presaleZinTokensGenerated = ethService.convertFromWei(
            transactions[i].presaleZinTokensGenerated
          );
        }
        dispatch({
          type: ActionTypes.FETCH_TRANSACTIONS,
          data: transactions,
        });
        if (callback) {
          callback(null);
        }
      } else {
        if (callback) {
          callback(response.data.message);
        }
      }
    } catch (err) {
      console.warn("error fetching transactions", err);
      if (callback) {
        callback(DEFAULT_ERROR);
      }
    }
  };
}

export function saveTransaction(data, callback) {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        API_URL + "/api/Profile/registeredtx",
        null,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.SAVE_TRANSACTION,
          data: data,
        });
        if (callback) {
          callback(null);
        }
      } else {
        if (callback) {
          callback(response.data.message);
        }
      }
    } catch (err) {
      console.warn("error saving transaction", err);
      if (callback) {
        callback(DEFAULT_ERROR);
      }
    }
  };
}

export function fetchBonusTransactions(callback) {
  return async (dispatch) => {
    try {
      let response = await axios.get(API_URL + "/api/Profile/getbonustxs", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        let transactions = response.data.data;
        let ethService = new EthService();
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
        dispatch({
          type: ActionTypes.FETCH_BONUS_TRANSACTIONS,
          data: transactions,
        });
        if (callback) {
          callback(null);
        }
      } else {
        if (callback) {
          callback(response.data.message);
        }
      }
    } catch (err) {
      console.warn("error fetching bonus transactions", err);
      if (callback) {
        callback(DEFAULT_ERROR);
      }
    }
  };
}
