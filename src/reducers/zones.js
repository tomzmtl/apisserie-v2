import { SET_IS_LOADING, DELETE } from "../actions/zones"

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
      const index = state.items.findIndex(
        zone => zone.id === action.payload.zone.id
      )

      if (index === -1) {
        return {
          ...state,
          items: state.items.concat(action.payload.zone)
        }
      }

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          action.payload.zone,
          ...state.items.slice(index + 1),
        ]
      }
    }

    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    
    case DELETE:
      return {
        ...state,
        items: state.items.filter(z => z.id !== action.payload.zoneId)
      }

    default: return state
  }
}
