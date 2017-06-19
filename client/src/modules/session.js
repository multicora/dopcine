import {Map} from "immutable";
import { createSelector } from 'reselect';

import SessionService from 'services/session';
import {loadItem, saveItem} from 'helpers/localStorage';
export const ON_LOGIN = 'session/ON_LOGIN';
export const SAVE_USER_PROFILE = 'session/SAVE_USER_PROFILE';

const initialState = Map({
  token: !!loadItem("token"),
  user: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      saveItem("token", action.token)
      return state.set({
        token: !!action.token
      });

    case SAVE_USER_PROFILE:
      return state.set("user", action.user);

    default:
      return state
  }
}

export const verifyUser = ({token}) => {
  return dispatch => {
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