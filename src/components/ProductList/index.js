import './styles.css';
import products from '../../data/products'
import Product from '../Product';

const ProductList = () => {
  return products.map(product => (
    <Product product={product} key={product.name} />
  ))
}

export default ProductList