import FetchAdapter from "helpers/fetchHelper.js";

export default {
  register: (data) => {
    return FetchAdapter("POST", "/api/register", data);
  },
  login: (data) => {
    return FetchAdapter("POST", "/api/login", data);
  },
  logout: (data) => {
    return FetchAdapter("POST", "/api/logout");
  },
  resetPassword: (data) => {
    return FetchAdapter("POST", "/api/reset-password", data);
  },
  setPassword: (data) => {
    return FetchAdapter("POST", "/api/set-password", data);
  },
  confirmEmail: (data) => {
    return FetchAdapter("POST", "/api/confirm-email", data);
  },
}
