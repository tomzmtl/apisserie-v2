export const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCTS": 
      return action.payload.products.map(product => ({
        zone: 1,
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
        ...state.slice(0, index - 1),
        action.payload.product,
        ...state.slice(index),
      ]
    }
    
    default: return state
  }
}