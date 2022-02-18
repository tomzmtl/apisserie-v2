import API from '@aws-amplify/api'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../actions/products'
import { selectProductListGroupedByZone } from '../../selectors/products'
import { useLoadProducts } from '../../hooks/products';
import { useLoadZones } from '../../hooks/zones';
import Product from '../Product'
import './styles.scss';

const ShopList = () => {
  useLoadProducts()
  useLoadZones()

  const productsByZone = useSelector(selectProductListGroupedByZone)
  const dispatch = useDispatch()

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(PRODUCT_API, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = products => products.map(product => (
    <Product product={product} key={product.id} onClick={handleProductClick(product)} />
  ))

  const renderProductsByZone = productsByZone => productsByZone.map(zone => (
    <div className="ShopList__zone">
      <div className="ShopList__zoneName">{zone.name}</div>
      {renderProducts(zone.products)}
    </div>
  ))

  return (
    <div className="ShopList">
      <div className="ShopList__list">
        {renderProductsByZone(productsByZone)}
      </div>
    </div>
  )
}

export default ShopList;
