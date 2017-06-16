import {loadItem, saveItem} from 'helpers/localStorage';
export const ON_LOGIN = 'session/ON_LOGIN';

const initialState = {
  token: !!loadItem("token")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      saveItem("token", action.token)
      return {
        ...state,
        token: !!action.token
      }

    default:
      return state
  }
}