import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog } from '../../petate-ui'
// import { useNavigation } from '../../hooks/navigation'
import { useLoadZones } from "../../hooks/zones"
import { selectZonesByOrder } from '../../selectors/zones'
import Card from '../Card'
import ZoneEdit from "../ZoneEdit"
import ZoneAdd from '../ZoneAdd'
import "./styles.scss"

const ZoneAdmin = () => {
  useLoadZones()

  const zones = useSelector(selectZonesByOrder)

  const [editId, setEditId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  
  // const navigateTo = useNavigation()

  const renderZones = () => zones.map(zone => {
    const cardProps = {
      className: "ZoneAdmin__item",
      onClick: () => {
        setEditId(zone.id)
        setIsOpen(true)
      },
      key: zone.id
    }

    return (
      <Card {...cardProps}>
        {zone.name} ({zone.order})
      </Card>
    )
  })

  return (
    <div className="ZoneAdmin">
      {renderZones()}
      <ZoneAdd />
      <Dialog.Root open={isOpen} onClose={() => setIsOpen(false)} >
        <ZoneEdit zoneId={editId} onClose={() => setIsOpen(false)} />
      </Dialog.Root>
    </div>
  )
}

export default ZoneAdmin
