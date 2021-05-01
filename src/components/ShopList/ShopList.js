import API from '@aws-amplify/api'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../actions/products'
import { selectSelectedProductsByZoneOrder } from '../../selectors/products'
import Product from '../Product'
import './styles.scss';

const ShopList = () => {
  const products = useSelector(selectSelectedProductsByZoneOrder)
  const dispatch = useDispatch()

  console.log(444, products);

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(PRODUCT_API, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = () => products
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