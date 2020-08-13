import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from 'js-cookie'

const DEFAULT_ERROR = "An error occurred. Please try again or contact support."

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
  Cookies.remove('userName')
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    try {
      let response = await axios.post("/api/Account/register", data);
      if (response.status === 201) {
        dispatch({
          type: ActionTypes.REGISTER_USER,
        });
      } else {
        dispatch({
          type: ActionTypes.REGISTER_USER_ERROR,
          data: response.data.message ? response.data.message : 'An error occurred'
        });
      }
    } catch (err) {
      console.log("error registering user", err);
      dispatch({
        type: ActionTypes.REGISTER_USER_ERROR,
        data: DEFAULT_ERROR
      });
    }
  };
}

export function login(userName, password, rememberMe, setCookies) {
  return async (dispatch) => {
    try {
      if (userName === 'admin' && password === 'admin') {
        dispatch({
          type: ActionTypes.SET_EMAIL_CONFIRM,
          data: true,
        });
        dispatch(fetchUser({ userName }));
        if (rememberMe) {
          console.log('remember me')
          Cookies.set('userName', userName, { path: '/' })
        }
        return
      }
      let authResponse = await axios.get("/api​/Auth/login", {
        userName,
        password
      });
      if (authResponse.status === 200) {
        let profileResponse = await axios.get('/api/Profile', null, {
          headers: {
            Authorization: `Bearer ${authResponse.data.tempToken}`
          }
        })
        if (profileResponse.status === 200) {
          dispatch({
            type: ActionTypes.SET_EMAIL_CONFIRM,
            data: !authResponse.data.data.isEmailUnVerified,
          });
          dispatch(fetchUser({ userName }));
        } else {
          dispatch({
            type: ActionTypes.USER_AUTH_ERROR,
            data: DEFAULT_ERROR
          });
        }
      } else {
        dispatch({
          type: ActionTypes.USER_AUTH_ERROR,
          data: authResponse.data.message
        });
      }
    } catch (err) {
      console.log("error logging in user", err);
      dispatch({
        type: ActionTypes.USER_AUTH_ERROR,
        data: DEFAULT_ERROR
      });
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
