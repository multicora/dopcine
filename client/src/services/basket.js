import FetchAdapter, { getAuthHeaders } from "helpers/fetchHelper.js";
import { loadItem } from "helpers/localStorage";

const headers = { ...getAuthHeaders(loadItem("token")) };

let items = [
  {id: 1, img:"", name: "Item 1", price: "339", currency: "EUR"},
  {id: 2, img:"", name: "Item 2", price: "339", currency: "EUR"},
  {id: 3, img:"", name: "Item 3", price: "339", currency: "EUR"}
];

export default {
  getBasket: (data) => {
    // return FetchAdapter("GET", "api/basket", data, headers);
    return new Promise((res, rej) =>
      res(items)
    );
  },
  removeBasketItem: (data) => {
    // return FetchAdapter("DELETE", "api/basket", data, headers);
    items = items.filter((item) => item.id !== data.id);
    return new Promise((res, rej) =>
      res({})
    );
  },
  checkout: (data) => {
    return FetchAdapter("GET", "api/checkout", data, headers);
  },
};
