import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/actions/products'

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    API
      .get('api41415b60', '/products/name')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response));
  }, [dispatch])
}