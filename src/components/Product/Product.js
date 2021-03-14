import { useState } from 'react';
import Card from '../Card';
import './styles.css';

const Product = ({ product, onClick }) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <Card className="Product" onClick={handleClick} isActive={isActive}>
      {product.name}
    </Card>
  )
}

export default Product