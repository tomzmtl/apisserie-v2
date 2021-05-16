import { ButtonBase } from '@material-ui/core';
import { MonetizationOn, MonetizationOnOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import * as api from "../../api/products"
import { updateProduct } from "../../actions/products"
import './styles.scss';

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const apiUpdate = product => api.putProduct(product).then(
    () => dispatch(updateProduct(product))
  )

  const handleClick = () => {
    const nextSelected = !product.selected
    
    const updatedProduct = {
      ...product,
      selected: nextSelected,
      discounted: nextSelected === false ? false : product.discounted
    }
    
    apiUpdate(updatedProduct)
  }

  const handleDiscountClick = () => {
    const nextDiscounted = !product.discounted

    const updatedProduct = {
      ...product,
      discounted: nextDiscounted,
      selected: !product.selected && nextDiscounted ? true : product.selected
    }
    
    apiUpdate(updatedProduct)
  }

  const rootProps = {
    className: classNames({
      Product: true,
      'Product--active': product.selected,
      'Product--discounted': product.discounted,
    }),
  }

  return (
    <div {...rootProps}>
      <ButtonBase className="Product__base" onClick={handleClick}>
        {product.name}
      </ButtonBase>
      <ButtonBase className="Product__discount" onClick={handleDiscountClick} centerRipple>
        {product.discounted ? <MonetizationOn /> : <MonetizationOnOutlined />}
      </ButtonBase>
    </div>
  )
}

export default Product
