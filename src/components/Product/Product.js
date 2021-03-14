import { API } from 'aws-amplify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/actions/products';
import Card from '../Card';
import './styles.css';

const Product = ({ product, onClick }) => {
  const [isActive, setIsActive] = useState(product.selected === true)
  const dispatch = useDispatch()

  const handleClick = () => {
    const selected = !isActive
    setIsActive(selected)

    const updatedProduct = { ...product, selected }
    
    API.put("api41415b60", "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  return (
    <Card className="Product" onClick={handleClick} isActive={isActive}>
      {product.name}
    </Card>
  )
}

export default Product