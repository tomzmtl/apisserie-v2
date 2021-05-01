import API from '@aws-amplify/api'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../redux/actions/products'
import Product from '../Product'
import './styles.scss';

const ShopList = () => {
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(PRODUCT_API, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = () => products
    .filter(product => product.selected)
    .sort((a, b) => a.zone > b.zone ? -1 : 1)
    .map(product => <Product product={product} key={product.id} onClick={handleProductClick(product)} />)

  return (
    <div className="ShopList">
      <div className="ShopList__list">
        {renderProducts()}
      </div>
    </div>
  )
}

export default ShopList;