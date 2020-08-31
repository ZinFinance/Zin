import * as ActionTypes from "../constants";

const initialState = {
  ethToUSDValue: 400,
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
    case ActionTypes.SET_ETH_TO_USD_VALUE: {
      return {
        ...state,
        ethToUSDValue: action.data,
      };
    }
    default:
      return state;
  }
}
