import {
  combineReducers
} from "redux-immutable";

import { routerReducer } from "react-router-redux";
import auth from "./auth";
import dialog from "./dialog";
import session from "./session";

export default combineReducers({
  routing: routerReducer,
  auth,
  dialog,
  session
});