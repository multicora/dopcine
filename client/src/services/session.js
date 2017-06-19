import FetchAdapter from "helpers/fetchHelper.js";

export default {
  verifyUser: (data) => {
    return FetchAdapter("POST", "/api/verify-user", data);
  }
}
