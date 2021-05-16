import { Save } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from "uuid/v4"
import { Button, TextField, Dialog } from '../../petate-ui'
import { updateZone } from '../../actions/zones'
import { selectZones } from '../../selectors/zones'
import "./styles.scss"
import * as api from '../../api/zones'

const ZoneEdit = ({ zoneId, onClose }) => {
  const dispatch = useDispatch()
  const zones = useSelector(selectZones)
  const zone = zoneId
    ? zones.find(({ id }) => id === zoneId)
    : { id: uuid() }

  const [name, setName] = useState(zoneId ? zone.name : "")
  const [order, setOrder] = useState(zoneId ? zone.order.toString() : "1")

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...zone,
      name,
      order: Number(order)
    }

    api.putZone(body).then(() => {
      dispatch(updateZone(body))
      onClose?.()

      if (!zoneId) {
          setName("")
          setOrder("1")
        }
    })
  }

  const handleChangeName = (e) => setName(e.target.value)
  const handleChangeOrder = (e) => setOrder(e.target.value)

  return (
    <div className="ZoneEdit">
      <form onSubmit={handleSubmit}>
        <Dialog.Content>
          <TextField value={name} placeholder="Name" onChange={handleChangeName} required />
          <TextField value={order} placeholder="Order" onChange={handleChangeOrder} type="number" required />
        </Dialog.Content>
        <Dialog.Actions>
          <Button label={zoneId ? "Mettre à jour" : "Ajouter"} icon={<Save />} submit variant="confirm" />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ZoneEdit