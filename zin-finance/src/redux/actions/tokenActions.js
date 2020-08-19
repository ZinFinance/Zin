import * as ActionTypes from "../constants";

export function setTokenBalance(data) {
  return {
    type: ActionTypes.SET_TOKEN_BALANCE,
    data,
  };
}
