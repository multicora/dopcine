export const loadItem = (key) => {
  try {
    const value = localStorage.getItem("key");
    if (value === null) {
      return undefined;
    }
    // use JSON.parse in case of serializable data
    return value;
  } catch (err) {
    console.warn(`cant get "${key}" from LocaStorage`);
    return undefined;
  }
}

export const saveItem = (key, value) => {
  try {
    // use JSON.stringify in case of serializable fata 
    localStorage.setItem("key", value);
  } catch (err) {
    console.warn(`cant save "${key}" to LocaStorage`);
  }
}