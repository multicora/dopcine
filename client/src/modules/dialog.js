import {Map} from "immutable";

export const TOGGLE_VISIBILITY = 'dialog/TOGGLE_VISIBILITY';
export const SET_CONTENT = 'dialog/SET_CONTENT';

const initialState = Map({
  open: false,
  message: "",
  hasLoader: true,
  loaderIcon: "action.loaderIcon",
  onOpen: "",
  onOpenProps: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return state.merge({
        open: !state.get("open"),
        message: !state.get("open") ? action.message : "",
        hasLoader: action.hasLoader,
        loaderIcon: action.loaderIcon,
        onOpen: !state.get("open") ? action.onOpen : "",
        onOpenProps: action.onOpenProps
      });
    case SET_CONTENT:
      return state.merge({
        message: state.get("open") ? action.message : "",
        hasLoader: action.hasLoader,
        loaderIcon: action.loaderIcon,
        onOpen: false
      });

    default:
      return state
  }
}

export const toggle = ({message, hasLoader, loaderIcon, onOpen, onOpenProps}) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_VISIBILITY,
      message,
      hasLoader,
      loaderIcon,
      onOpen,
      onOpenProps
    })
  }
}

export const setContent = ({message, hasLoader, loaderIcon}) => {
  return dispatch => {
    dispatch({
      type: SET_CONTENT,
      message,
      hasLoader,
      loaderIcon
    })
  }
}