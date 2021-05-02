import { useSelector } from 'react-redux'
import { useNavigation } from '../../hooks/navigation'
import { selectProductsByName } from '../../selectors/products'
import { selectZones } from '../../selectors/zones'
import Card from '../Card'
import { useLoadProducts } from '../../hooks/products';
import { useLoadZones } from '../../hooks/zones';
import "./styles.scss"

const ProductAdmin = () => {
  useLoadProducts()
  useLoadZones()

  const products = useSelector(selectProductsByName)
  const zones = useSelector(selectZones)
  const navigateTo = useNavigation()

  const renderProducts = () => products
    .map(product => {
      const zone = zones.find(zone => zone.id === product.zoneId)

      const cardProps = {
        className: "ProductAdmin__item",
        onClick: () => navigateTo(`/products/${product.id}`),
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
    </div>
  )
}

export default ProductAdmin
