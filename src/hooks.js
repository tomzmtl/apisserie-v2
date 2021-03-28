import { useCallback, useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/actions/products'
import { useHistory } from 'react-router';
import { API_NAME } from './constants';

const makeTimestamp = () => Math.round((new Date()).getTime() / 1000)

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [ts, setTs] = useState(makeTimestamp())

  const sendRequest = useCallback(
    () => {
      setTs(makeTimestamp())

      API
        .get(API_NAME, '/products/id')
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

export const useNavigation = () => {
  const history = useHistory()
  return path => history.push(path)
}