import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Card, CardActionArea, CardHeader } from "@mui/material"
import { Dialog } from '../../petate-ui'
import { selectZonesByOrder } from '../../selectors/zones'
import ZoneEdit from "../ZoneEdit"
import ZoneAdd from '../ZoneAdd'
import "./styles.scss"

const ZoneAdmin = () => {
  const zones = useSelector(selectZonesByOrder)
  const [editId, setEditId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const renderZones = () => zones.map(zone => {
    const handleCardClick = () => {
      setEditId(zone.id)
      setIsOpen(true)
    }

    return (
      <Card key={zone.id}>
        <CardActionArea onClick={handleCardClick}>
          <CardHeader avatar={`${zone.order}.`} title={zone.name} />
        </CardActionArea>
      </Card>
    )
  })

  return (
    <div className="ZoneAdmin">
      <Stack spacing={1}>
        {renderZones()}
      </Stack>
      <ZoneAdd />
      <Dialog.Root open={isOpen} onClose={() => setIsOpen(false)} >
        <ZoneEdit zoneId={editId} onClose={() => setIsOpen(false)} />
      </Dialog.Root>
    </div>
  )
}

export default ZoneAdmin
