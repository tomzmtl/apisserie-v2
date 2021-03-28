import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/actions/products'
import { useHistory } from 'react-router';
import { API_NAME } from './constants';

export const useLoadProducts = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    API
      .get(API_NAME, '/products/id')
      .then(response => dispatch(setProducts(response)))
      .catch(error => console.log(error.response));
  }, [dispatch])
}

export const useNavigation = () => {
  const history = useHistory()
  return path => history.push(path)
}