import { combineReducers } from "redux";
import userReducer from "./userReducer";
import kycReducer from "./kycReducer";
import tokenReducer from "./tokenReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  userReducer,
  kycReducer,
  tokenReducer,
  transactionReducer,
});
