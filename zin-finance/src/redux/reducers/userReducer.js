import * as ActionTypes from "../constants";

const initialState = {
  user: null,
  emailVerified: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      return {
        ...state,
        user: action.data,
        loginError: false,
        updateError: false,
      };
    }
    case ActionTypes.LOGOUT_USER: {
      return { ...state, user: null, emailVerified: false };
    }
    case ActionTypes.SET_EMAIL_CONFIRM: {
      return { ...state, emailVerified: action.data };
    }
    default:
      return state;
  }
}
