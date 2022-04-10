import { useSelector } from "react-redux"
import {
  Stack,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
} from "@mui/material"
import { Add, ArrowCircleUp } from "@mui/icons-material"
import { selectZonesByOrder } from "../../selectors/zones"
import { useZoneEdit } from "../Zone/hooks"
import * as api from "../../api/zones"
import "./styles.scss"
import { useState } from "react"
import { updateZone } from "../../actions/zones"
import { useDispatch } from "react-redux"

const Zones = () => {
  const zones = useSelector(selectZonesByOrder)
  const { zoneEditComponents, openZoneEdit } = useZoneEdit()
  const [loading, setLoading] = useState([])
  const dispatch = useDispatch()

  const renderZones = () =>
    zones.map((zone, index) => {
      const handleCardClick = () => {
        openZoneEdit(zone.id)
      }

      const isLoading = loading.includes(zone.id)

      const handleMoveUp = (e) => {
        e.stopPropagation()

        const previousZone = zones[index - 1]

        setLoading([previousZone.id, zone.id])

        const currentUpdate = { ...zone, order: index - 1 }
        const prevUpdate = { ...previousZone, order: previousZone.order + 1 }

        Promise.all([api.putZone(currentUpdate), api.putZone(prevUpdate)])
          .then(() => {
            dispatch(updateZone(currentUpdate))
            dispatch(updateZone(prevUpdate))
          })
          .finally(() => {
            setLoading([])
          })
      }

      const cardHeaderProps = {
        action: (
          <IconButton
            aria-label="settings"
            onClick={handleMoveUp}
            disabled={index === 0}
            component="div"
          >
            <ArrowCircleUp />
          </IconButton>
        ),
        title: zone.name,
      }

      return (
        <Card key={zone.id} sx={{ opacity: isLoading ? 0.5 : 1 }}>
          <CardActionArea
            onClick={handleCardClick}
            disabled={loading.includes(zone.id)}
          >
            <CardHeader {...cardHeaderProps} />
          </CardActionArea>
        </Card>
      )
    })

  return (
    <div className="Zones">
      <Stack spacing={1}>{renderZones()}</Stack>
      <Card key="zone-dd" sx={{ mt: 3 }}>
        <CardActionArea onClick={() => openZoneEdit(null, "")}>
          <CardHeader
            avatar={<Add color="secondary" />}
            title="Ajouter un rayon..."
          />
        </CardActionArea>
      </Card>
      {zoneEditComponents}
    </div>
  )
}

export default Zones
