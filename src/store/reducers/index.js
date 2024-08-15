import { combineReducers } from "redux";
import { userReducer } from "./user";
import { authReducer } from "./auth";
import {establishmentReducer} from './establishments';
import {favoriteReducer} from './favorite';
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  establishments: establishmentReducer,
  favorite: favoriteReducer,

});

export default rootReducer;
