import FetchAdapter from "helpers/fetchHelper.js";

export default {
  upload: (data) => {
    return FetchAdapter("POST", "api/file", data);
  }
}
