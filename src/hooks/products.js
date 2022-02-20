import { useCallback, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from '../actions/products'
import { PRODUCT_API } from '../constants';
import { makeTimestamp } from '../helpers';
import { setIsLoading, updateProduct } from '../actions/products';

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  const [ts, setTs] = useState(makeTimestamp())

  const sendRequest = useCallback(
    () => {
      setTs(makeTimestamp())

      API
        .get(PRODUCT_API, '/products/id')
        .then(response => dispatch(setProducts(response)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
    }, [dispatch])
  
  useEffect(() => {
    dispatch(setIsLoading(true))

    sendRequest()
  }, [dispatch, sendRequest, ts])

  return { sendRequest }
}

export const useUpdateProduct = () => {
  const dispatch = useDispatch()

  const update = (product) => {
    API.put(PRODUCT_API, "/products", { body: product })
      .then(() => {
        dispatch(updateProduct(product))
      })
  }

  return { update }
}
