import { combineReducers } from "redux";
import userReducer from "./userReducer";
import kycReducer from "./kycReducer";
import transactionReducer from "./transactionReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  userReducer,
  kycReducer,
  transactionReducer,
  adminReducer,
});
