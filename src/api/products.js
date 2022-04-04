import { API } from 'aws-amplify'
import { PRODUCT_API } from '../constants'

export const putProduct = product => API.put(PRODUCT_API, "/products", { body: product })

export const deleteProduct = productId => API.del(PRODUCT_API, `/products/object/${productId}`)

export const getProducts = () => API.get(PRODUCT_API, '/products/id')
