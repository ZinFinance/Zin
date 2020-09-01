import * as ActionTypes from "../constants";

const initialState = {
  userTransactions: {},
  userBonusTransactions: {},
  users: null,
  bonuses: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_USERS: {
      return {
        ...state,
        users: action.data.sort((a, b) => {
          return (
            new Date(b.createDateTimeOffset) - new Date(a.createDateTimeOffset)
          );
        }),
      };
    }
    case ActionTypes.SET_USER_TRANSACTIONS: {
      return {
        ...state,
        userTransactions: {
          ...state.userTransactions,
          [action.data.userId]: action.data.transactions.sort((a, b) => {
            return (
              new Date(b.createDateTimeOffset) -
              new Date(a.createDateTimeOffset)
            );
          }),
        },
      };
    }
    case ActionTypes.SET_USER_BONUS_TRANSACTIONS: {
      return {
        ...state,
        userBonusTransactions: {
          ...state.userBonusTransactions,
          [action.data.userId]: action.data.transactions.sort((a, b) => {
            return (
              new Date(b.createDateTimeOffset) -
              new Date(a.createDateTimeOffset)
            );
          }),
        },
      };
    }
    case ActionTypes.SET_USER_KYC_STATUS: {
      let users = state.users;
      let userIndex = users.findIndex(
        (user) => user.userId === action.data.userId
      );
      users[userIndex].kycStatus = action.data.kycStatus;
      return {
        ...state,
        users,
      };
    }
    case ActionTypes.SET_BONUSES: {
      return {
        ...state,
        bonuses: action.data,
      };
    }
    case ActionTypes.UPDATE_BONUS: {
      let bonuses = state.bonuses;
      let bonusIndex = bonuses.findIndex(
        (bonus) => bonus.bonusType === action.data.bonusType
      );
      bonuses[bonusIndex] = action.data;
      return {
        ...state,
        bonuses,
      };
    }
    default:
      return state;
  }
}
