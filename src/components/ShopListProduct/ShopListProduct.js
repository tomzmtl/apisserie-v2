import Product from '../Product'
import './styles.scss';
import { ButtonBase } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const ShopListProduct = ({ product, onClick, onClickEdit }) => {
  return (
    <div className="ShopList__product">
      <Product product={product} key={product.id} onClick={onClick} />
      {
        product.zoneId === "UNKNOWN"
          ? <ButtonBase onClick={onClickEdit} className="ShopListProduct__editBtn"><Edit /></ButtonBase>
          : null
      }
    </div>
  )
}

export default ShopListProduct;
