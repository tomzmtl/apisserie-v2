import ProductItem from '../ProductItem'
import './styles.scss';
import { ButtonBase } from '@mui/material';
import { Edit } from '@mui/icons-material';

const ShopListProduct = ({ product, onClick, onClickEdit }) => {
  return (
    <div className="ShopList__product">
      <ProductItem product={product} key={product.id} onClick={onClick} />
      {
        product.zoneId === "NONE"
          ? <ButtonBase onClick={onClickEdit} className="ShopListProduct__editBtn"><Edit /></ButtonBase>
          : null
      }
    </div>
  )
}

export default ShopListProduct;
