import { fromJS } from "immutable";
import { createSelector } from "reselect";
import BasketService from "services/basket";

export const TOGGLE_VISIBILITY = "files/TOGGLE_VISIBILITY";
export const SET_ITEMS = "files/SET_ITEMS";

const initialState = fromJS({
  isBasketActive: false,
  isOpen: false,
  qauntity: undefined,
  items: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return state.set(
        "isOpen", !!action.isOpen
      );

    case SET_ITEMS:
      const quantity = action.items && action.items.length;

      return state.merge({
        isBasketActive: true,
        items: action.items,
        quantity
      });

    default:
      return state;
  }
};

export const toggle = (data) => {
  return {
    type: TOGGLE_VISIBILITY,
    ...(data.hasOwnProperty("isOpen") ? {isOpen: data.isOpen} : {})
  };
};

export const getBasket = () => {

  return dispatch => {
    return BasketService.getBasket()
      .then(response => {
        if (response.error) {
          // dispatch({
          //   type: SET_DIALOG_CONTENT,
          //   message: response.error,
          //   hasLoader: true,
          //   loaderIcon: "Error"
          // });
          // setTimeout(() => {
          //   dispatch({
          //     type: TOGGLE_DIALOG_VISIBILITY
          //   });
          // }, 2500);
        } else {
          dispatch({
            type: SET_ITEMS,
            items: response
          });
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  };
};

export const removeItem = ({id}) => {

  return dispatch => {
    return BasketService.removeBasketItem({id})
      .then(response => {
        if (response.error) {
          // dispatch({
          //   type: SET_DIALOG_CONTENT,
          //   message: response.error,
          //   hasLoader: true,
          //   loaderIcon: "Error"
          // });
          // setTimeout(() => {
          //   dispatch({
          //     type: TOGGLE_DIALOG_VISIBILITY
          //   });
          // }, 2500);
        } else {
          dispatch(getBasket());
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  };
};

export const checkout = () => {

  return dispatch => {
    return BasketService.checkout()
      .then(response => {
        if (response.error) {
          // dispatch({
          //   type: SET_DIALOG_CONTENT,
          //   message: response.error,
          //   hasLoader: true,
          //   loaderIcon: "Error"
          // });
          // setTimeout(() => {
          //   dispatch({
          //     type: TOGGLE_DIALOG_VISIBILITY
          //   });
          // }, 2500);
        } else {
          
        }
      }).catch((err) => {
        console.warn((err.message || err).toString());
      });
  };
};

// selectors

// selector
const getItems = (state) => state.get("basket").get("items");
// reselect function
const getBasketItemsState = createSelector(
  [ getItems ],
  (items) => items
);

export const selectors = {
  getBasketItemsState
};