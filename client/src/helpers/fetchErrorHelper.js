export default (response) => {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}