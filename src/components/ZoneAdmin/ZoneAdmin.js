import { useSelector } from 'react-redux'
import { useNavigation } from '../../hooks/navigation'
import { useLoadZones } from "../../hooks/zones"
import { selectZonesByOrder } from '../../selectors/zones'
import Card from '../Card'
import AddZone from '../AddZone'
import "./styles.scss"

const ZoneAdmin = () => {
  useLoadZones()
  const products = useSelector(selectZonesByOrder)
  const navigateTo = useNavigation()

  const renderZones = () => products
    .map(zone => (
      <Card className="ZoneAdmin__item" onClick={() => navigateTo(`/products/${zone.id}`)} key={zone.id}>
        {zone.name} ({zone.order})
      </Card>
    ))

  return (
    <div className="ZoneAdmin">
      {renderZones()}
      <AddZone />
    </div>
  )
}

export default ZoneAdmin
