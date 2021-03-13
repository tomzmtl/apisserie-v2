import { useState } from 'react';
import classnames from 'classnames'
import './styles.css';

const Product = ({ product, onClick }) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const classes = classnames({
    Product: true,
    'Product--active': isActive
  })

  return (
    <div className={classes} onClick={handleClick}>{product.name}</div>
  )
}

export default Product