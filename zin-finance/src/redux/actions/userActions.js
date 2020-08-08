import * as ActionTypes from "../constants";

export const fetchUser = (data) => {
  return {
    type: ActionTypes.FETCH_USER,
    data,
  };
};

export const logoutUser = (data) => {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};
