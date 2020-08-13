import * as ActionTypes from "../constants";

const initialState = {
  user: null,
  emailVerified: false,
  justRegistered: false,
  registerError: false,
  loginError: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      return { ...state, user: action.data, loginError: false, emailVerified: action.data.userName === 'admin' };
    }
    case ActionTypes.LOGOUT_USER: {
      return { ...state, user: null };
    }
    case ActionTypes.SET_EMAIL_CONFIRM: {
      return { ...state, emailVerified: action.data };
    }
    case ActionTypes.REGISTER_USER: {
      return { ...state, justRegistered: true, registerError: false };
    }
    case ActionTypes.REGISTER_USER_ERROR: {
      return { ...state, registerError: action.data };
    }
    case ActionTypes.USER_AUTH_ERROR: {
      return { ...state, loginError: action.data };
    }
    default:
      return state;
  }
}
