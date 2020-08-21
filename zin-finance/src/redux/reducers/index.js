import { combineReducers } from "redux";
import userReducer from "./userReducer";
import kycReducer from "./kycReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  userReducer,
  kycReducer,
  transactionReducer,
});
