import './styles.scss';
import { useSelector } from 'react-redux'
import Product from '../Product';
import { useLoadProducts } from '../../hooks';

const ProductList = () => {
  useLoadProducts()
  const products = useSelector(state => state.products)

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
