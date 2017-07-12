import {Map} from "immutable";
import { createSelector } from "reselect";

import SessionService from "services/session";
import {saveItem} from "helpers/localStorage";
export const ON_LOGIN = "session/ON_LOGIN";
export const SAVE_USER_PROFILE = "session/SAVE_USER_PROFILE";
export const VERIFYING_IN_PROGRESS = "session/VERIFYING_IN_PROGRESS";

const initialState = Map({
  isLogging: false,
  isUserLogged: false,
  user: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      saveItem("token", action.token)
      return state.merge({
        isUserLogged: !!action.token,
        isLogging: false
      });

    case VERIFYING_IN_PROGRESS:
      return state.set("isLogging", true);

    case SAVE_USER_PROFILE:
      return state.merge({
        user: action.user,
        isLogging: false,
        isUserLogged: true
      });

    default:
      return state;
  }
};

export const verifyUser = ({token}) => {
  return dispatch => {
    dispatch({type: VERIFYING_IN_PROGRESS});
    return SessionService.verifyUser({token})
      .then(response => {
        if (response.error) {
          dispatch({
            type: ON_LOGIN,
            token: false
          });
        } else {
          dispatch({
            type: SAVE_USER_PROFILE,
            user: response
          });
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  }
};

// selectors

// selector
const getUserProfile = (state) => state.get("session").get("user");
// reselect function
const getUserProfileState = createSelector(
  [ getUserProfile ],
  (user) => user
);

export const selectors = {
  getUserProfileState
};