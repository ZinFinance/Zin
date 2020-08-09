import * as ActionTypes from "../constants";

const initialState = {
  accessToken: null,
  applicationStatus: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_KYC_ACCESS_TOKEN: {
      return { ...state, accessToken: action.data };
    }
    case ActionTypes.SET_KYC_APPLICATION_STATUS: {
      return { ...state, applicationStatus: action.data };
    }
    default:
      return state;
  }
}
