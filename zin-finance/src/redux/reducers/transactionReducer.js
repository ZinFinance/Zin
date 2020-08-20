import * as ActionTypes from "../constants";

const initialState = {
  transactions: [],
  bonusTransactions: [],
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
    case ActionTypes.FETCH_BONUS_TRANSACTIONS: {
      return {
        ...state,
        bonusTransactions: action.data,
      };
    }
    default:
      return state;
  }
}
