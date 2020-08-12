import * as ActionTypes from "../constants";

const initialState = {
  user: null,
  emailVerified: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      return { ...state, user: action.data };
    }
    case ActionTypes.LOGOUT_USER: {
      return { ...state, user: null };
    }
    case ActionTypes.SET_EMAIL_CONFIRM: {
      return { ...state, emailVerified: action.data };
    }
    default:
      return state;
  }
}
