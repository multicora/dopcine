export const TOGGLE_VISIBILITY = 'auth/TOGGLE_VISIBILITY'
export const SELECT_TAB = 'auth/SELECT_TAB'

const initialState = {
  open: false,
  selectedTab: "login"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_VISIBILITY:
      return {
        ...state,
        open: !state.open,
        selectedTab: !state.open ? initialState.selectedTab : state.selectedTab
      }

    case SELECT_TAB:
      return {
        ...state,
        selectedTab: action.value
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