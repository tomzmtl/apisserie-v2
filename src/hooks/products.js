import { useCallback, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from '../actions/products'
import { PRODUCT_API } from '../constants';
import { makeTimestamp } from '../helpers';

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [ts, setTs] = useState(makeTimestamp())

  const sendRequest = useCallback(
    () => {
      setTs(makeTimestamp())

      API
        .get(PRODUCT_API, '/products/id')
        .then(response => dispatch(setProducts(response)))
        .catch(error => console.log(error.response))
        .finally(() => setIsLoading(false))
    }, [dispatch])
  
  useEffect(() => {
    setIsLoading(true)

    sendRequest()
  }, [dispatch, sendRequest, ts])

  return { sendRequest, isLoading }
}