const FORM_DATA = "FORM_DATA";

export const getAuthHeaders = (token) => {
  return { Authorization: `auth ${token}` };
};

const errorHelper = (response) => {
  return response.text().then(function(text) {
    return text ? JSON.parse(text) : {};
  })
};

const prepareConfig = (type, config) => {
  let result = Object.assign({}, config || {});

  switch (type) {
    case FORM_DATA:
      if (result.headers["Content-Type"]) {
        delete result.headers["Content-Type"];
      }

      return result;

    default:
      result.headers["Content-Type"] = 'application/json';
      result.body = JSON.stringify(result.body);

      return result;
  }
}

export default (method, url, body = {}, headers = {}) => {
  const type = Object.prototype.toString.call(body) === "[object FormData]" ? FORM_DATA : "";
  const config = prepareConfig(type, {body, headers})

  if (!method) {
    return {
      error: true,
      message: `method for ${url} call wasn't specified`
    };
  } else {
    return fetch(url, {
      method: method,
      ...config
    }).then(errorHelper);
  }
};