import ProductEdit from '../ProductEdit'
import "./styles.scss"

const ProductAdd = ({ prefillText }) => {
  return (
    <div className="ProductAdd">
      <ProductEdit prefillText={prefillText} />
    </div>
  )
}

export default ProductAdd

