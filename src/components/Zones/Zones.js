import { useSelector } from 'react-redux'
import { Stack, Card, CardActionArea, CardHeader } from "@mui/material"
import { Add } from "@mui/icons-material"
import { selectZonesByOrder } from '../../selectors/zones'
import { useZoneEdit } from '../Zone/hooks'
import "./styles.scss"

const Zones = () => {
  const zones = useSelector(selectZonesByOrder)
  const { zoneEdit, openZoneEdit } = useZoneEdit()

  const renderZones = () => zones.map(zone => {
    const handleCardClick = () => {
      openZoneEdit(zone.id)
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
    <div className="Zones">
      <Stack spacing={1}>
        {renderZones()}
      </Stack>
      <Card key="zone-dd" sx={{ mt: 3, mb: 5 }}>
        <CardActionArea onClick={() => openZoneEdit(null, "")}>
          <CardHeader avatar={<Add color="secondary" />} title="Add zone..." />
        </CardActionArea>
      </Card>
      {zoneEdit}
    </div>
  )
}

export default Zones
