import { Drawer } from "@mui/material"
import Product from "../Product"

const ProductEdit = ({ onClose, productId, isOpen, add = null }) => {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
    >
      <Product productId={productId} onAfterSave={onClose} add={add} />
    </Drawer>
  )
}

export default ProductEdit
