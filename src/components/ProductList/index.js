import './styles.css';
import Product from '../Product';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

const ProductList = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {

    API
      .get('apisserieapi', '/products/id')
      .then(response => setProducts(response))
      .catch(error => console.log(error.response));
  }, [])

  const renderProducts = () => products.map(product => (
    <Product product={product} key={product.name} />
  ))

  return (
    <div className="ProductList">
      {renderProducts()}
    </div>
  )
}

export default ProductList
