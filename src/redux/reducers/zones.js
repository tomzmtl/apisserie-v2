export const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ZONES": 
      return action.payload.zones
    
    case "UPDATE_ZONE": {
      const index = state.findIndex(
        zone => zone.id === action.payload.zone.id
      )

      if (index === -1) {
        return state.concat(action.payload.zone)
      }

      return [
        ...state.slice(0, index),
        action.payload.zone,
        ...state.slice(index + 1),
      ]
    }

    default: return state
  }
}
