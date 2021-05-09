import { Edit } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Dialog } from '../../petate-ui'
import { updateZone } from '../../actions/zones'
import { selectZones } from '../../selectors/zones'
import "./styles.scss"
import * as api from '../../api/zones'

const ZoneEdit = ({ zoneId, onClose }) => {
  const dispatch = useDispatch()
  const zones = useSelector(selectZones)
  const zone = zones.find(({ id }) => id === zoneId)

  const [name, setName] = useState(zone ? zone.name : null)

  if (!zone) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...zone,
      name,
    }

    api.putZone(body).then(() => {
      dispatch(updateZone(body))
      onClose()
    })
  }

  const handleChangeName = (e) => setName(e.target.value)

  return (
    <div className="ZoneEdit">
      <form onSubmit={handleSubmit}>
        <Dialog.Content>
          <TextField value={name} placeholder="Name" onChange={handleChangeName} required />
        </Dialog.Content>
        <Dialog.Actions>
          <div />
          <Button label="Mettre à jour" icon={<Edit />} submit />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ZoneEdit