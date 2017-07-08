import FetchAdapter, { getAuthHeaders } from "helpers/fetchHelper.js";
import { loadItem } from "helpers/localStorage";

const headers = { ...getAuthHeaders(loadItem("token")) };

export default {
  upload: (data) => {
    return FetchAdapter("POST", "api/file", data, headers);
  }
}
