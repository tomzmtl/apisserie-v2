import API from '@aws-amplify/api'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../actions/products'
import { selectProductListGroupedByZone } from '../../selectors/products'
import ShopListProduct from '../ShopListProduct'
import { useProductEditDialog } from '../ProductEditDialog/hooks'
import './styles.scss';

const List = () => {
  const { dialog, openDialog } = useProductEditDialog()
  const productsByZone = useSelector(selectProductListGroupedByZone)
  const dispatch = useDispatch()

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(PRODUCT_API, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = products => products.map(product => {
    const productProps = {
      key: product.id,
      product: product,
      onClick: handleProductClick,
      onClickEdit: () => openDialog(product.id)
    }

    return <ShopListProduct {...productProps} />
  })

  const renderProductsByZone = productsByZone => productsByZone.map(zone => (
    <div className="List__zone">
      <div className="List__zoneName">{zone.name}</div>
      {renderProducts(zone.products)}
    </div>
  ))

  return (
    <div className="List">
      <div className="List__list">
        {renderProductsByZone(productsByZone)}
      </div>
      {dialog}
    </div>
  )
}

export default List;
