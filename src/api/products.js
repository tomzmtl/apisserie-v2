import { API } from "aws-amplify"
import { PRODUCT_API } from "../constants"
import { PRODUCTS_MOCK } from "./products.mock"

export const putProduct = (product, isDevMode = false) => {
  if (isDevMode) {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return API.put(PRODUCT_API, "/products", { body: product })
}

export const deleteProduct = (productId, isDevMode = false) => {
  if (isDevMode) {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return API.del(PRODUCT_API, `/products/object/${productId}`)
}

export const getProducts = (isDevMode = false) => {
  if (isDevMode) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(PRODUCTS_MOCK), 2000)
    })
  }

  return API.get(PRODUCT_API, "/products/id")
}
