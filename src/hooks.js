import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

export const useLoadProducts = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    API
      .get('api41415b60', '/products/name')
      .then(response => {
        setProducts(response.map(product => ({
          zone: 1,
          selected: false,
          ...product,
        })))
      })
      .catch(error => console.log(error.response));
  }, [])

  return { products }
}