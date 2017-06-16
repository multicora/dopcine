import FetchAdapter from "helpers/fetchHelper.js";

export default {
  register: (data) => {
    return FetchAdapter("POST", "/api/register", data);
  },
  login: (data) => {
    return FetchAdapter("POST", "/api/login", data);
  },
  confirmEmail: (data) => {
    return FetchAdapter("POST", "/api/confirm-email", data);
  },
}
