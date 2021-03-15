import Card from '../Card';
import './styles.scss';

const Product = ({ product, onClick }) => {
  return (
    <Card className="Product" onClick={onClick} isActive={product.selected}>
      {product.name}
    </Card>
  )
}

export default Product