import API from '@aws-amplify/api'
import { useDispatch, useSelector } from 'react-redux'
import { API_NAME } from '../../constants'
import { useLoadProducts } from '../../hooks'
import { updateProduct } from '../../redux/actions/products'
import Product from '../Product'
import './styles.scss';

const ShopList = () => {
  useLoadProducts()
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(API_NAME, "/products", { body: updatedProduct })
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