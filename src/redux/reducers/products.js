export const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCTS": 
      return action.payload.products.map(product => ({
        zone: 1,
        selected: false,
        ...product
      }))

    case "UPDATE_PRODUCT": {
      const index = state.findIndex(
        product => product.name === action.payload.product.name
      )

      if (index === -1) {
        return state.concat(action.payload.product)
      }

      return [
        ...state.slice(0, index),
        action.payload.product,
        ...state.slice(index + 1),
      ]
    }

    case "DELETE_PRODUCT":
      return state.filter(product => product.name !== action.payload.product.name)
    
    default: return state
  }
}