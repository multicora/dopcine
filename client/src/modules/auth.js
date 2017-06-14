import AuthService from 'services/auth.js';

export const TOGGLE_VISIBILITY = 'auth/TOGGLE_VISIBILITY';
export const SELECT_TAB = 'auth/SELECT_TAB';
export const REQUEST_INPROGRESS = 'auth/REQUEST_INPROGRESS';
export const REQUEST_COMPLETED = 'auth/REQUEST_COMPLETED';
export const REQUEST_FAILED = 'auth/REQUEST_FAILED';
export const REGISTER = 'auth/REGISTER';

const initialState = {
  open: false,
  selectedTab: "login",
  requestError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        open: !state.open,
        selectedTab: !state.open ? initialState.selectedTab : state.selectedTab,
        requestInProgress: false,
        requestError: ""
      }

    case SELECT_TAB:
      return {
        ...state,
        selectedTab: action.value,
        requestInProgress: false,
        requestError: ""
      }

    case REQUEST_INPROGRESS:
      return {
        ...state,
        requestInProgress: true
      }

    case REQUEST_COMPLETED:
      return {
        ...state,
        open: false,
        requestInProgress: false,
        requestError: ""
      }

    case REQUEST_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: action.error
      }

    default:
      return state
  }
}

export const toggle = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_VISIBILITY
    })
  }
}

export const selectTab = (value) => {
  return dispatch => {
    dispatch({
      type: SELECT_TAB,
      value
    })
  }
}

export const register = ({email, password, confirmPassword, firstName, lastName}) => {

  return dispatch => {
    dispatch({
      type: REQUEST_INPROGRESS
    });

    return AuthService.register({email, password, confirmPassword, firstName, lastName})
     .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch({
          type: REQUEST_FAILED,
          error: response.message
        });
      }).catch((err) => { console.warn((err).toString()) })
  }
}

export const login = ({email, password}) => {
  return dispatch => {
    dispatch({
      type: REQUEST_INPROGRESS
    });

    return AuthService.login({email, password})
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch({
          type: REQUEST_FAILED,
          error: response.message
        });
      }).catch((err) => { console.warn((err).toString()); });
  }
}