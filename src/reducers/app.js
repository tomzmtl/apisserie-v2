import { REFRESH, TOGGLE_DEV_MODE } from "../actions/app"

const initialState = {
  lastRefreshed: [],
  isDevMode: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        lastRefreshed: Date.now(),
      }

    case TOGGLE_DEV_MODE:
      return {
        ...state,
        isDevMode: !state.isDevMode,
      }

    default:
      return state
  }
}
