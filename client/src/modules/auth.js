import {Map} from "immutable";
import { createSelector } from 'reselect'

import AuthService from 'services/auth';
import {TOGGLE_VISIBILITY as TOGGLE_DIALOG_VISIBILITY, SET_CONTENT as SET_DIALOG_CONTENT} from './dialog';
import {ON_LOGIN} from './session';

export const TOGGLE_VISIBILITY = 'auth/TOGGLE_VISIBILITY';
export const SELECT_TAB = 'auth/SELECT_TAB';
export const REQUEST_INPROGRESS = 'auth/REQUEST_INPROGRESS';
export const REQUEST_COMPLETED = 'auth/REQUEST_COMPLETED';
export const REQUEST_FAILED = 'auth/REQUEST_FAILED';
export const REGISTER = 'auth/REGISTER';

const initialState = Map({
  open: false,
  selectedTab: "login",
  requestInProgress: false,
  requestError: "",
  requestMessage: "",
  token: ""
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return initialState.merge({
        open: !state.get("open"),
        selectedTab: !state.get("open") ? initialState.get("selectedTab") : state.get("selectedTab")
      });

    case SELECT_TAB:
      return initialState.merge({
        open: state.get("open"),
        selectedTab: action.value
      })

    case REQUEST_INPROGRESS:
      return state.merge({
        requestInProgress: true,
        requestMessage: action.requestMessage
      });

    case REQUEST_COMPLETED:
      return initialState.set({
        requestMessage: action.requestMessage || ""
      });

    case REQUEST_FAILED:
      return state.merge({
        requestInProgress: false,
        requestError: action.error,
        requestMessage: action.requestMessage || "",
        token: action.token
      });

    default:
      return state
  }
}

export const toggle = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_VISIBILITY
    })
  }
}

export const selectTab = (value) => {
  return dispatch => {
    dispatch({
      type: SELECT_TAB,
      value
    })
  }
}

export const register = ({email, password, confirmPassword, firstName, lastName}) => {

  return dispatch => {
    dispatch({
      type: REQUEST_INPROGRESS
    });

    return AuthService.register({email, password, confirmPassword, firstName, lastName})
      .then(response => {
        if (response.error) {
          dispatch({
            type: REQUEST_FAILED,
            error: response ? response.message : "An error occured in Auth 'Register' call"
          });
        } else {
          dispatch({
            type: REQUEST_COMPLETED,
          });
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  }
}

export const login = ({email, password}) => {
  return dispatch => {
    dispatch({
      type: REQUEST_INPROGRESS
    });

    return AuthService.login({email, password})
      .then(response => {
        if (response.error) {
          dispatch({
            type: REQUEST_FAILED,
            error: response ? response.message : "An error occured in Auth 'Login' call"
          });
        } else {
          dispatch({
            type: ON_LOGIN,
            token: response.token
          });
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  }
}

export const confirmEmail = ({token}) => {
  return dispatch => {

    return AuthService.confirmEmail({token})
      .then(response => {
        if (response.error) {
          dispatch({
            type: SET_DIALOG_CONTENT,
            message: response.error,
            hasLoader: true,
            loaderIcon: "Error"
          });
        } else {
          dispatch({
            type: SET_DIALOG_CONTENT,
            message: "Email has been confirmed successfully!",
            hasLoader: true,
            loaderIcon: "Success",
          });

          setTimeout(() => {
            dispatch({
              type: TOGGLE_DIALOG_VISIBILITY
            });
          }, 2500);

          setTimeout(() => {
            dispatch({
              type: TOGGLE_VISIBILITY
            });
          }, 2700);
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  }
}

// selewctors

// selector
const getOpen = (state) => state.get("auth").get("open")
// reselect function
const getOpenState = createSelector(
  [ getOpen ],
  (open) => open
);

export const selectors = {
  getOpenState
};