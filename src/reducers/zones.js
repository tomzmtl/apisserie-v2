import { SET_IS_LOADING } from "../actions/zones"

const initialState = {
  items: [],
  isLoading: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ZONES": 
      return {
        ...state,
        items: action.payload.zones
      }
    
    case "UPDATE_ZONE": {
      const index = state.findIndex(
        zone => zone.id === action.payload.zone.id
      )

      if (index === -1) {
        return state.concat(action.payload.zone)
      }

      return {
        ...state,
        items: [
          ...state.slice(0, index),
          action.payload.zone,
          ...state.slice(index + 1),
        ]
      }
    }

    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    default: return state
  }
}
