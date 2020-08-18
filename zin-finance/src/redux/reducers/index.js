import { combineReducers } from "redux";
import userReducer from "./userReducer";
import kycReducer from "./kycReducer";
import tokenReducer from "./tokenReducer";

export default combineReducers({ userReducer, kycReducer, tokenReducer });
