import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/actions/products'

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    API
      .get('productsApi', '/products/id')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response));
  }, [dispatch])
}
