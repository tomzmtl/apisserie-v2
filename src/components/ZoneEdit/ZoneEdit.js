import { Save, Delete } from '@mui/icons-material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from "uuid"
import { Button, TextField, Dialog } from '../../petate-ui'
import { deleteZone, updateZone } from '../../actions/zones'
import { selectZones } from '../../selectors/zones'
import "./styles.scss"
import * as api from '../../api/zones'

const ZoneEdit = ({ zoneId, onClose }) => {
  const dispatch = useDispatch()
  const zones = useSelector(selectZones)
  const zone = zoneId
    ? zones.find(({ id }) => id === zoneId)
    : { id: uuid() }

  const [name, setName] = useState(zone.name || "")
  const [order, setOrder] = useState(zone.order?.toString() || "1")

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

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${zone.name}?`)

    if (!confirm) {
      return
    }

    api.deleteZone(zone.id).then(() => {
      onClose()
      dispatch(deleteZone(zone.id))
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
          {zoneId && <Button onClick={handleDelete} icon={<Delete />} variant="cancel" />}
          <Button label={zoneId ? "Mettre à jour" : "Ajouter"} icon={<Save />} submit variant="confirm" />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ZoneEdit
