import { Dialog } from "../../petate-ui"
import ProductEdit from "../ProductEdit"

const ProductEditDialog = ({ onClose, productId, isOpen }) => {
  return (
    <Dialog.Root open={isOpen} onClose={onClose}>
      <ProductEdit productId={productId} onClose={onClose} />
    </Dialog.Root>
  )
}

export default ProductEditDialog
