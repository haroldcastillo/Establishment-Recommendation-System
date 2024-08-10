import { combineReducers } from "redux";
import { userReducer } from "./user";
import { authReducer } from "./auth";
import {establishmentReducer} from './establishments'
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  establishments: establishmentReducer
});

export default rootReducer;
