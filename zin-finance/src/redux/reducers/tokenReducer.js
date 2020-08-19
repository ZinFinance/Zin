import * as ActionTypes from "../constants";

const initialState = {
  tokenBalance: 0,
  tokenRate: process.env.REACT_APP_API_TOKEN_RATE,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_TOKEN_BALANCE: {
      return {
        ...state,
        tokenBalance: action.data,
      };
    }
    default:
      return state;
  }
}
