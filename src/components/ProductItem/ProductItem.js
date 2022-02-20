import { ButtonBase } from '@mui/material';
import { MonetizationOn, MonetizationOnOutlined } from '@mui/icons-material';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import * as api from "../../api/products"
import { updateProduct } from "../../actions/products"
import './styles.scss';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch()

  const apiUpdate = nextProduct => {
    dispatch(updateProduct(nextProduct))

    api.putProduct(nextProduct)
      .catch(() => dispatch(updateProduct(product)))
  }

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
      ProductItem: true,
      'ProductItem--active': product.selected,
      'ProductItem--discounted': product.discounted,
    }),
  }

  return (
    <div {...rootProps}>
      <ButtonBase className="ProductItem__base" onClick={handleClick}>
        {product.name}
      </ButtonBase>
      <ButtonBase className="ProductItem__discount" onClick={handleDiscountClick} centerRipple>
        {product.discounted ? <MonetizationOn /> : <MonetizationOnOutlined />}
      </ButtonBase>
    </div>
  )
}

export default ProductItem
