import './styles.css';
import Product from '../Product';
import { useLoadProducts } from '../../hooks';

const ProductList = () => {
  const { products } = useLoadProducts()

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
