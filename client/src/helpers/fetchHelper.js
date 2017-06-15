const errorHelper = (response) => {
  return response.json();
}
export default (method, url, body, params = {}) => {
  if (!method) {
    return {
      error: true,
      message: `method for ${url} call wasn't specified`
    }; 
  } else {
    return fetch(url, {
      method: method,
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      ...params
    }).then(errorHelper);
  }
}