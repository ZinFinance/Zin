import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from "js-cookie";

const DEFAULT_ERROR = "An error occurred. Please try again or contact support.";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";

export function logoutUser() {
  Cookies.remove("token");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function fetchTransactions(callback) {
  return async (dispatch) => {
    try {
      let response = await axios.get("/api/Profile/getregisteredtxs", null, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.FETCH_TRANSACTIONS,
          data: response.data.data,
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
      let response = await axios.post("/api/Profile/registeredtx", null, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
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
