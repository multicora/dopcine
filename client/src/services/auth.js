export {default as handleErrors} from "helpers/fetchErrorHelper.js";

export default {
  register: (data) => {
    return fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  login: (data) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}
