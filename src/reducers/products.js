import { SET_IS_LOADING } from "../actions/products"

const initialState = {
  isLoading: false,
  items: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        items: action.payload.products.map(product => ({
          zone: 1,
          selected: false,
          ...product
        }))
      }

    case "UPDATE_PRODUCT": {
      const index = state.findIndex(
        product => product.id === action.payload.product.id
      )

      if (index === -1) {
        return state.concat(action.payload.product)
      }

      return {
        ...state,
        items: [
          ...state.slice(0, index),
          action.payload.product,
          ...state.slice(index + 1),
        ]
      }
    }

    case "DELETE_PRODUCT":
      return {
        ...state,
        items: state.filter(product => product.id !== action.payload.productId)
      }
    
    case SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    
    default: return state
  }
}