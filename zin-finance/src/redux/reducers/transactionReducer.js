import * as ActionTypes from "../constants";

const initialState = {
  transactions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.data,
      };
    }
    case ActionTypes.SAVE_TRANSACTION: {
      return {
        ...state,
        transactions: [...state.transactions, action.data],
      };
    }
    default:
      return state;
  }
}
