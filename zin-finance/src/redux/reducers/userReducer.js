import * as ActionTypes from "../constants";

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USER: {
      return {
        ...state,
        user: !state.user ? action.data : { ...state.user, ...action.data },
      };
    }
    case ActionTypes.LOGOUT_USER: {
      return { ...state, user: null };
    }
    case ActionTypes.SET_TOKEN_BALANCE: {
      return {
        ...state,
        user: state.user ? { ...state.user, tokenBalance: action.data } : null,
      };
    }
    default:
      return state;
  }
}
