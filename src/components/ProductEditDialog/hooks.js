import { useState } from "react"
import ProductEditDialog from "."

export const useProductEditDialog = () => {
  const [productId, setProductId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const dialogProps = {
    onClose: () => setIsOpen(false),
    productId,
    isOpen
  } 

  return {
    dialog: <ProductEditDialog {...dialogProps} />,
    openDialog: (productId) => {
      setProductId(productId)
      setIsOpen(true)
    }
  }
}
