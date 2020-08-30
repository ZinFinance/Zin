import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import EthService from "../../ethService";
import { fetchUser } from "./userActions";

const DEFAULT_ERROR = "An error occurred. Please try again or contact support.";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://stgzinapi.azurewebsites.net";

const ethService = new EthService();

export function logoutUser() {
  Cookies.remove("token");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function fetchTransactions(callback) {
  return async (dispatch) => {
    let response = null;
    try {
      response = await axios.get(API_URL + "/api/Profile/getregisteredtxs", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        let transactions = response.data.data;
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
        if (err.response && err.response.data && err.response.data.message) {
          callback(err.response.data.message);
        } else {
          callback(DEFAULT_ERROR);
        }
      }
    }
  };
}

export function saveTransaction(data, callback) {
  return async (dispatch) => {
    let response = null;
    try {
      response = await axios.post(API_URL + "/api/Profile/registertx", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        dispatch(fetchUser());
        dispatch(fetchTransactions());
        dispatch(fetchBonusTransactions());
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
        if (err.response && err.response.data && err.response.data.message) {
          callback(err.response.data.message);
        } else {
          callback(DEFAULT_ERROR);
        }
      }
    }
  };
}

export function fetchBonusTransactions(callback) {
  return async (dispatch) => {
    let response = null;
    try {
      response = await axios.get(API_URL + "/api/Profile/getbonustxs", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
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
        if (err.response && err.response.data && err.response.data.message) {
          callback(err.response.data.message);
        } else {
          callback(DEFAULT_ERROR);
        }
      }
    }
  };
}
