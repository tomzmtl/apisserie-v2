import { useState } from "react"
import ProductEdit from "."

export const useProductEdit = () => {
  const [productId, setProductId] = useState(null)
  const [name, setName] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const editProps = {
    onAfterSave: () => setIsOpen(false),
    productId,
    add: name,
    isOpen
  } 

  return {
    productEdit: <ProductEdit {...editProps} />,
    openProductEdit: (productId, name) => {
      setProductId(productId)
      setName(name)
      setIsOpen(true)
    }
  }
}
