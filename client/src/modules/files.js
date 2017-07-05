import {Map} from "immutable";
// import { createSelector } from "reselect";
import FileStorageService from "services/fileStorage";

import {TOGGLE_VISIBILITY as TOGGLE_DIALOG_VISIBILITY, SET_CONTENT as SET_DIALOG_CONTENT} from "./dialog";
export const SET_UPLOAD_COMPLETED = "files/SET_UPLOAD_COMPLETED";

const initialState = Map({
  uploadCompleted: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UPLOAD_COMPLETED:
      return state.set(
        "uploadCompleted", !!action.isCompleted
      );

    // case SAVE_USER_PROFILE:
    //   return state.set("user", action.user);

    default:
      return state;
  }
};

export const addVideo = (formData) => {

  return dispatch => {
    dispatch({
      type: TOGGLE_DIALOG_VISIBILITY,
      message: "Saving video...",
        loaderIcon: "action.loaderIcon"
    });
    dispatch({
      type: SET_UPLOAD_COMPLETED,
      isCompleted: false
    });

    return FileStorageService.upload(formData)
      .then(response => {
        if (response.error) {
          dispatch({
            type: SET_DIALOG_CONTENT,
            message: response.error,
            hasLoader: true,
            loaderIcon: "Error"
          });
          setTimeout(() => {
            dispatch({
              type: TOGGLE_DIALOG_VISIBILITY
            });
          }, 2500);
        } else {
          dispatch({
            type: SET_DIALOG_CONTENT,
            message: "Video has been saved successfully!",
            hasLoader: true,
            loaderIcon: "Success",
          });
          setTimeout(() => {
            dispatch({
              type: TOGGLE_DIALOG_VISIBILITY
            });
            dispatch({
              type: SET_UPLOAD_COMPLETED,
              isCompleted: true
            });
          }, 2500);
        }

      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  };
};


export const setUploadCompleted = (isCompleted) => {
  return {
    type: SET_UPLOAD_COMPLETED,
    isCompleted: isCompleted
  };
}
// selectors

// selector
// const getUserProfile = (state) => state.get("session").get("user");
// reselect function
// const getUserProfileState = createSelector(
//   [ getUserProfile ],
//   (user) => user
// );

// export const selectors = {
//   getUserProfileState
// };