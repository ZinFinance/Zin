import * as ActionTypes from "../constants";
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";

export function fetchUser(data) {
  return {
    type: ActionTypes.FETCH_USER,
    data,
  };
}

export function logoutUser() {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    try {
      let response = await axios.post("/api/Account/register", data);
      if (response.status === "200") {
        dispatch({
          type: ActionTypes.REGISTER_USER,
          data,
        });
      }
    } catch (err) {
      console.log("error registering user", err);
    }
  };
}

export function getEmailConfirmStatus(userId, token) {
  return async (dispatch) => {
    try {
      let response = await axios.get("/api​/Account​/register", null, {
        params: {
          userId,
          token,
        },
      });
      if (response.status === "200") {
        dispatch({
          type: ActionTypes.SET_EMAIL_CONFIRM,
          data: true,
        });
      }
    } catch (err) {
      console.log("error registering user", err);
    }
  };
}
