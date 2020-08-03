import * as ActionTypes from '../constants'

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
        return {...state, user: action.data}
    }
    case ActionTypes.LOGOUT_USER: {
        return {...state, user: null}
    }
    default:
      return state;
  }
}
