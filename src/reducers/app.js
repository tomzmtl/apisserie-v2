import { REFRESH } from "../actions/app"

const initialState = {
  lastRefreshed: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        lastRefreshed: Date.now()
      }

    default: return state
  }
}
