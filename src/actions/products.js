export const SET_IS_LOADING = "PRODUCTS.SET_IS_LOADING"

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  payload: { isLoading }
})

export const setProducts = products => ({
  type: "SET_PRODUCTS",
  payload: { products }
})

export const updateProduct = product => ({
  type: "UPDATE_PRODUCT",
  payload: { product }
})

export const deleteProduct = productId => ({
  type: "DELETE_PRODUCT",
  payload: { productId }
})