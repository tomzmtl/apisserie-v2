import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/actions/products'
import { useHistory } from 'react-router';
import { API_NAME } from './constants';

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)

    API
      .get(API_NAME, '/products/id')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response))
      .finally(() => setIsLoading(false))
  }, [dispatch])

  return isLoading
}

export const useNavigation = () => {
  const history = useHistory()
  return path => history.push(path)
}