export const setProducts = products => ({
  type: "SET_PRODUCTS",
  payload: { products }
})

export const updateProduct = product => ({
  type: "UPDATE_PRODUCT",
  payload: { product }
})

export const deleteProduct = product => ({
  type: "DELETE_PRODUCT",
  payload: { product }
})