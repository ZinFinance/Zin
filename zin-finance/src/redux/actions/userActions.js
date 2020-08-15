import * as ActionTypes from "../constants";
import axios from "axios";
import Cookies from "js-cookie";

const DEFAULT_ERROR = "An error occurred. Please try again or contact support.";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/http://localhost:5000";

const verifiedTestAccount = {
  firstName: "admin",
  lastName: "zin",
  email: "admin@admin.com",
  userName: "admin@admin.com",
  ethAddress: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
};

const unverifiedTestAccount = {
  firstName: "agent",
  lastName: "zin",
  email: "agent@agent.com",
  userName: "agent@agent.com",
  ethAddress: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
};

export function logoutUser() {
  Cookies.remove("token");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function fetchUser(token) {
  return async (dispatch) => {
    let profile = await _fetchUser(token);
    let emailConfirmed = await _getEmailConfirmStatus(
      profile.data.email,
      token
    );
    dispatch(_setEmailConfirmStatus(emailConfirmed));
    dispatch(_setUser(profile.data));
  };
}

export async function registerUser(data) {
  try {
    if (data.email === verifiedTestAccount.email) {
      return null;
    }
    let response = await axios.post("/api/Account/register", data);
    if (response.status === 201) {
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.log("error registering user", err);
    return DEFAULT_ERROR;
  }
}

export async function resetPassword(userName) {
  try {
    if (userName === verifiedTestAccount.email) {
      return null;
    }
    let response = await axios.get("/api/Account/reset", null, {
      params: {
        userName,
      },
    });
    if (response.status === 200) {
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.log("error resetting password", err);
    return DEFAULT_ERROR;
  }
}

export function login(email, password, rememberMe, callback) {
  return async (dispatch) => {
    try {
      if (email === verifiedTestAccount.email) {
        dispatch(_setEmailConfirmStatus(true));
        dispatch(_setUser(verifiedTestAccount));
        if (rememberMe) {
          Cookies.set("token", email, { expires: 7, path: "/" });
        } else {
          Cookies.set("token", email, { path: "/" });
        }
        if (callback) {
          callback();
        }
        return;
      } else if (email === unverifiedTestAccount.email) {
        dispatch(_setEmailConfirmStatus(false));
        dispatch(_setUser(unverifiedTestAccount));
        if (rememberMe) {
          Cookies.set("token", email, { expires: 7, path: "/" });
        } else {
          Cookies.set("token", email, { path: "/" });
        }
        if (callback) {
          callback();
        }
        return;
      }
      let authResponse = await axios.get("/api​/Auth/login", {
        email,
        password,
      });
      if (authResponse.status === 200) {
        let profile = await _fetchUser(authResponse.data.tempToken);
        dispatch({
          type: ActionTypes.SET_EMAIL_CONFIRM,
          data: !authResponse.data.data.isEmailUnVerified,
        });
        dispatch(_setUser(profile.data));
        if (rememberMe) {
          Cookies.set("token", authResponse.data.tempToken, { path: "/" });
        } else {
          Cookies.set("token", authResponse.data.tempToken, {
            expires: 7,
            path: "/",
          });
        }
        if (callback) {
          callback();
        }
      } else {
        if (callback) {
          callback(authResponse.data.message);
        }
      }
    } catch (err) {
      console.log("error logging in user", err);
      if (callback) {
        callback(DEFAULT_ERROR);
      }
    }
  };
}

export function updateUser(data, callback) {
  return async (dispatch) => {
    try {
      if (data.email === verifiedTestAccount.email) {
        dispatch(_setUser(data));
        if (callback) {
          callback();
        }
        return;
      }
      let updateResponse = await axios.put("/api​/Profile", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (updateResponse.status === 200) {
        dispatch(_setUser(data));
        if (callback) {
          callback();
        }
      } else {
        if (callback) {
          callback(updateResponse.data.message);
        }
      }
    } catch (err) {
      console.log("error updating user", err);
      dispatch({
        type: ActionTypes.USER_UPDATE_ERROR,
        data: DEFAULT_ERROR,
      });
      if (callback) {
        callback(DEFAULT_ERROR);
      }
    }
  };
}

export async function updatePassword(data) {
  try {
    let updateResponse = await axios.post(
      "/api​/Account/updatePassword",
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (updateResponse.status === 200) {
      return null;
    } else {
      return updateResponse.data.message;
    }
  } catch (err) {
    console.log("error updating password", err);
    return DEFAULT_ERROR;
  }
}

export async function resendEmail(email) {
  try {
    if (email === unverifiedTestAccount.email) {
      return null;
    }
    let resendResponse = await axios.post("/api​/Account/email/resent", null, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      params: {
        email,
      },
    });
    if (resendResponse.status === 200) {
      return null;
    } else {
      return resendResponse.data.message;
    }
  } catch (err) {
    console.log("error resending email", err);
    return DEFAULT_ERROR;
  }
}

function _setEmailConfirmStatus(emailConfirmed) {
  return {
    type: ActionTypes.SET_EMAIL_CONFIRM,
    data: emailConfirmed,
  };
}

function _setUser(data) {
  return {
    type: ActionTypes.SET_USER,
    data,
  };
}

function _fetchUser(token) {
  return new Promise(async (resolve, reject) => {
    try {
      if (token === verifiedTestAccount.email) {
        resolve({
          data: verifiedTestAccount,
        });
        return;
      } else if (token === unverifiedTestAccount.email) {
        resolve({
          data: unverifiedTestAccount,
        });
        return;
      }
      let profileResponse = await axios.get("/api/Profile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (profileResponse.status === 200) {
        resolve(profileResponse.data);
      } else {
        reject(DEFAULT_ERROR);
      }
    } catch (err) {
      console.log("error getting user info", err);
      reject(DEFAULT_ERROR);
    }
  });
}

function _getEmailConfirmStatus(userId, token) {
  return new Promise(async (resolve, reject) => {
    try {
      if (token === verifiedTestAccount.email) {
        resolve(true);
        return;
      } else if (token === unverifiedTestAccount.email) {
        resolve(false);
        return;
      }
      let response = await axios.get("/api/Account/email/confirm", null, {
        params: {
          userId,
          token,
        },
      });
      if (response.status === "200") {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      console.log("error getting user email confirm status", err);
      reject(DEFAULT_ERROR);
    }
  });
}
