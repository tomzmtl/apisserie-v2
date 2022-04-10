import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setProducts } from "../actions/products"
import { setIsLoading, updateProduct } from "../actions/products"
import { getProducts, putProduct } from "../api/products"
import { selectIsDevMode } from "../selectors/app"

export const useLoadProducts = (ts) => {
  const dispatch = useDispatch()
  const isDevMode = useSelector(selectIsDevMode)

  const load = useCallback(() => {
    dispatch(setIsLoading(true))

    getProducts(isDevMode)
      .then((response) => dispatch(setProducts(response)))
      .catch((error) => console.log(error.response))
      .finally(() => dispatch(setIsLoading(false)))
  }, [dispatch, isDevMode])

  useEffect(() => {
    dispatch(setIsLoading(true))

    load()
  }, [dispatch, load, ts])

  return { load }
}

export const useUpdateProduct = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [productId, setProductId] = useState(null)
  const isDevMode = useSelector(selectIsDevMode)

  const update = (product) => {
    setIsLoading(true)
    setProductId(product.id)

    putProduct(product, isDevMode)
      .then(() => {
        dispatch(updateProduct(product))
      })
      .finally(() => {
        setIsLoading(false)
        setProductId(null)
      })
  }

  const unselect = (product) => {
    update({
      ...product,
      selected: false,
      selection: { tags: [] },
    })
  }

  return { isLoading, update, unselect, productId }
}
