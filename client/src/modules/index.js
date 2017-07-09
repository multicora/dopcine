import {
  combineReducers
} from "redux-immutable";

import { routerReducer } from "react-router-redux";
import auth from "./auth";
import dialog from "./dialog";
import session from "./session";
import files from "./files";
import basket from "./basket";
import layout from "./layout";

export default combineReducers({
  routing: routerReducer,
  auth,
  dialog,
  session,
  files,
  basket,
  layout
});