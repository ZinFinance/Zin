import { combineReducers } from "redux";
import userReducer from "./userReducer";
import kycReducer from "./kycReducer";

export default combineReducers({ userReducer, kycReducer });
