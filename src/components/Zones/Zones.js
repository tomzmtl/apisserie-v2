import { useSelector } from 'react-redux'
import { Stack, Card, CardActionArea, CardHeader } from "@mui/material"
import { Add } from "@mui/icons-material"
import { selectZonesByOrder } from '../../selectors/zones'
import { useZoneEdit } from '../Zone/hooks'
import "./styles.scss"

const Zones = () => {
  const zones = useSelector(selectZonesByOrder)
  const { zoneEditComponents, openZoneEdit } = useZoneEdit()

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
      <Card key="zone-dd" sx={{ mt: 3 }}>
        <CardActionArea onClick={() => openZoneEdit(null, "")}>
          <CardHeader avatar={<Add color="secondary" />} title="Ajouter un rayon..." />
        </CardActionArea>
      </Card>
      {zoneEditComponents}
    </div>
  )
}

export default Zones
