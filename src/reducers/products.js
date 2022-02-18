import { SET_IS_LOADING } from "../actions/products"

const initialState = {
  isLoading: false,
  items: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        items: action.payload.products.map(product => ({
          selected: false,
          ...product,
          zoneId: product.zoneId ?? "UNKNOWN"
        }))
      }

    case "UPDATE_PRODUCT": {
      const index = state.items.findIndex(
        product => product.id === action.payload.product.id
      )

      if (index === -1) {
        return {
          ...state,
          items: state.items.concat(action.payload.product)
        }
      }

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          action.payload.product,
          ...state.items.slice(index + 1),
        ]
      }
    }

    case "DELETE_PRODUCT":
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload.productId)
      }
    
    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    
    default: return state
  }
}
