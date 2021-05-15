import { useSelector } from 'react-redux'
import { selectProductsByName } from '../../selectors/products'
import { selectZones } from '../../selectors/zones'
import Card from '../Card'
import ProductEdit from '../ProductEdit'
import { useLoadProducts } from '../../hooks/products';
import { useLoadZones } from '../../hooks/zones';
import "./styles.scss"
import { useState } from 'react'
import { Dialog } from '../../petate-ui'

const ProductAdmin = () => {
  useLoadProducts()
  useLoadZones()

  const [editProductId, setEditProductId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const products = useSelector(selectProductsByName)
  const zones = useSelector(selectZones)

  const renderProducts = () => products
    .map(product => {
      const zone = zones.find(zone => zone.id === product.zoneId)

      const cardProps = {
        className: "ProductAdmin__item",
        onClick: () => {
          setEditProductId(product.id)
          setIsOpen(true)
        },
        key: product.id
      }
      
      return (
        <Card {...cardProps}>
          <div className="ProductAdmin__itemName">{product.name}</div>
          <div className="ProductAdmin__itemZone">{zone ? zone.name : "-"}</div>
        </Card>
      )
    })

  return (
    <div className="ProductAdmin">
      {renderProducts()}
      <Dialog.Root open={isOpen} onClose={() => setIsOpen(false)}>
        <ProductEdit productId={editProductId} onClose={() => setIsOpen(false)} />
      </Dialog.Root>
    </div>
  )
}

export default ProductAdmin
