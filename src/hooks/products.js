import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../actions/products'
import { setIsLoading, updateProduct } from '../actions/products';
import { getProducts, putProduct } from '../api/products';

export const useLoadProducts = (ts) => {
  const dispatch = useDispatch()

  const load = useCallback(
    () => {
      dispatch(setIsLoading(true))

      getProducts()
        .then(response => dispatch(setProducts(response)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
    }, [dispatch])
  
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

  const update = (product) => {
    setIsLoading(true)
    setProductId(product.id)

    putProduct(product)
      .then(() => {
        dispatch(updateProduct(product))
      })
      .finally(() => {
        setIsLoading(false)
        setProductId(null)
      })
  }

  const unselect = product => {
    update({
      ...product,
      selected: false,
      selection: { tags: [] }
    })
  }

  return { isLoading, update, unselect, productId }
}
