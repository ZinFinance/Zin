import * as ActionTypes from "../constants";

const initialState = {
  accessToken: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_KYC_ACCESS_TOKEN: {
      return { ...state, accessToken: action.data };
    }
    default:
      return state;
  }
}
