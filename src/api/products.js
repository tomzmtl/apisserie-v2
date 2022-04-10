import { API } from "aws-amplify"
import { PRODUCT_API } from "../constants"

const DEV_PRODUCTS = [
  {
    id: "1234",
    name: "TEST",
    tags: [],
    selected: false,
    selection: { tags: [] },
  },
]

export const putProduct = (product, isDevMode = false) => {
  if (isDevMode) {
    return Promise.resolve()
  }

  return API.put(PRODUCT_API, "/products", { body: product })
}

export const deleteProduct = (productId, isDevMode = false) => {
  if (isDevMode) {
    return Promise.resolve()
  }

  return API.del(PRODUCT_API, `/products/object/${productId}`)
}

export const getProducts = (isDevMode = false) => {
  if (isDevMode) {
    return Promise.resolve(DEV_PRODUCTS)
  }

  return API.get(PRODUCT_API, "/products/id")
}
