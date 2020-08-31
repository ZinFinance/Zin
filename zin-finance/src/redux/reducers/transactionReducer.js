import * as ActionTypes from "../constants";

const initialState = {
  transactions: null,
  bonusTransactions: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.data.sort((a, b) => {
          return (
            new Date(b.createDateTimeOffset) - new Date(a.createDateTimeOffset)
          );
        }),
      };
    }
    case ActionTypes.FETCH_BONUS_TRANSACTIONS: {
      return {
        ...state,
        bonusTransactions: action.data.sort((a, b) => {
          return (
            new Date(b.createDateTimeOffset) - new Date(a.createDateTimeOffset)
          );
        }),
      };
    }
    default:
      return state;
  }
}
