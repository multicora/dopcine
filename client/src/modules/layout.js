import { Map } from "immutable";
// import { createSelector } from "reselect";

export const SET_ACTIVE_BREAKPOINT = "layout/SET_ACTIVE_BREAKPOINT";
export const SET_STICKY = "layout/SET_STICKY";

const initialState = Map({
  breakpoint: false,
  isSticky: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BREAKPOINT:
      return state.set(
        "breakpoint", action.breakpoint
      );

    case SET_STICKY:
      return state.set(
        "isSticky", action.isSticky
      );

    default:
      return state;
  }
};

export const setBreakpoint = ({breakpoint}) => {
  return {
    type: SET_ACTIVE_BREAKPOINT,
    breakpoint
  };
};

export const setSticky = ({isSticky}) => {
  return {
    type: SET_STICKY,
    isSticky
  };
};


// selectors

// selector
// const getItems = (state) => state.get("basket").get("items");
// reselect function
// const getBasketItemsState = createSelector(
//   [ getItems ],
//   (items) => items
// );

// export const selectors = {
//   getBasketItemsState
// };