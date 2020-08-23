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

const ethService = new EthService();

const verifiedTestAccount = {
  firstName: "admin",
  lastName: "zin",
  email: "admin@admin.com",
  userName: "admin@admin.com",
  ethAddress: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  isEmailVerified: true,
  referralCode: "abc123",
  zinTokens: "0",
  referralZinTokens: "0",
  bonusZinTokens: "0",
  presaleZinTokens: "0",
  isAdmin: true,
};

const unverifiedTestAccount = {
  firstName: "agent",
  lastName: "zin",
  email: "agent@agent.com",
  userName: "agent@agent.com",
  ethAddress: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  isEmailVerified: false,
  referralCode: "xyz123",
  zinTokens: "0",
  referralZinTokens: "0",
  bonusZinTokens: "0",
  presaleZinTokens: "0",
};

export function setTokenBalance(data) {
  return {
    type: ActionTypes.SET_TOKEN_BALANCE,
    data,
  };
}

export function logoutUser() {
  Cookies.remove("token");
  return {
    type: ActionTypes.LOGOUT_USER,
  };
}

export function fetchUser(token) {
  return async (dispatch) => {
    let profile = await _fetchUser(token);
    dispatch(_setUser(profile.data));
    let balance = await ethService.getTokenBalance();
    dispatch(setTokenBalance(balance));
  };
}

export async function registerUser(data) {
  let response = null;
  try {
    if (data.email === verifiedTestAccount.email) {
      return null;
    }
    response = await axios.post(API_URL + "/api/Account/register", data);
    if (response.status === 201) {
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.warn("error registering user", err);
    if (response && response.data && response.data.message) {
      return response.data.message;
    } else {
      return DEFAULT_ERROR;
    }
  }
}

export async function resetPassword(userName) {
  let response = null;
  try {
    if (userName === verifiedTestAccount.email) {
      return null;
    }
    response = await axios.get(API_URL + `/api/Account/reset`, {
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
    console.warn("error resetting password", err);
    if (response && response.data && response.data.message) {
      return response.data.message;
    } else {
      return DEFAULT_ERROR;
    }
  }
}

export async function resetAccount(data) {
  let response = null;
  try {
    if (data.userId === verifiedTestAccount.email) {
      return null;
    }
    response = await axios.post(API_URL + "/api/Account/reset/confirm", data, {
      headers: {
        Authorization: `Bearer ${data.tempToken}`,
      },
    });
    if (response.status === 200) {
      return null;
    } else {
      return response.data.message;
    }
  } catch (err) {
    console.warn("error resetting account", err);
    if (response && response.data && response.data.message) {
      return response.data.message;
    } else {
      return DEFAULT_ERROR;
    }
  }
}

export function login(email, password, rememberMe, callback) {
  return async (dispatch) => {
    let authResponse = null;
    try {
      if (email === verifiedTestAccount.email) {
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
      authResponse = await axios.post(API_URL + "/api/Auth/login", {
        userName: email,
        password,
      });
      if (authResponse.status === 200) {
        let profile = await _fetchUser(authResponse.data.data.accessToken);
        dispatch(_setUser(profile.data));
        if (rememberMe) {
          Cookies.set("token", authResponse.data.data.accessToken, {
            expires: 7,
            path: "/",
          });
        } else {
          Cookies.set("token", authResponse.data.data.accessToken, {
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
      console.warn("error logging in user", err);
      if (callback) {
        if (authResponse && authResponse.errors) {
          callback(authResponse.data.message);
        } else {
          callback(DEFAULT_ERROR);
        }
      }
    }
  };
}

export function updateUser(data, callback) {
  return async (dispatch) => {
    let updateResponse = null;
    try {
      if (data.email === verifiedTestAccount.email) {
        dispatch(_setUser(data));
        if (callback) {
          callback();
        }
        return;
      }
      updateResponse = await axios.put(API_URL + "/api/Profile", data, {
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
      console.warn("error updating user", err);
      if (callback) {
        if (
          updateResponse &&
          updateResponse.data &&
          updateResponse.data.message
        ) {
          callback(updateResponse.data.message);
        } else {
          callback(DEFAULT_ERROR);
        }
      }
    }
  };
}

export async function updatePassword(data) {
  let updateResponse = null;
  try {
    updateResponse = await axios.post(
      API_URL + "/api/Account/changePassword",
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
    console.warn("error updating password", err);
    if (updateResponse && updateResponse.data && updateResponse.data.message) {
      return updateResponse.data.message;
    } else {
      return DEFAULT_ERROR;
    }
  }
}

export async function resendEmail(email) {
  let resendResponse = null;
  try {
    if (email === unverifiedTestAccount.email) {
      return null;
    }
    resendResponse = await axios.post(
      API_URL + "/api/Account/email/resend",
      null,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        params: {
          email,
        },
      }
    );
    if (resendResponse.status === 200) {
      return null;
    } else {
      return resendResponse.data.message;
    }
  } catch (err) {
    console.warn("error resending email", err);
    if (resendResponse && resendResponse.data && resendResponse.data.message) {
      return resendResponse.data.message;
    } else {
      return DEFAULT_ERROR;
    }
  }
}

// function _setEmailConfirmStatus(emailConfirmed) {
//   return {
//     type: ActionTypes.SET_EMAIL_CONFIRM,
//     data: emailConfirmed,
//   };
// }

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
        verifiedTestAccount.zinTokens = ethService.convertFromWei(
          verifiedTestAccount.zinTokens
        );
        verifiedTestAccount.referralZinTokens = ethService.convertFromWei(
          verifiedTestAccount.referralZinTokens
        );
        verifiedTestAccount.bonusZinTokens = ethService.convertFromWei(
          verifiedTestAccount.bonusZinTokens
        );
        verifiedTestAccount.presaleZinTokens = ethService.convertFromWei(
          verifiedTestAccount.presaleZinTokens
        );
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
      let profileResponse = await axios.get(API_URL + "/api/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let user = profileResponse.data;
      user.zinTokens = ethService.convertFromWei(user.zinTokens);
      user.referralZinTokens = ethService.convertFromWei(
        user.referralZinTokens
      );
      user.bonusZinTokens = ethService.convertFromWei(user.bonusZinTokens);
      user.presaleZinTokens = ethService.convertFromWei(user.presaleZinTokens);
      if (profileResponse.status === 200) {
        resolve(user);
      } else {
        reject(profileResponse.message);
      }
    } catch (err) {
      console.warn("error getting user info", err);
      reject(DEFAULT_ERROR);
    }
  });
}
