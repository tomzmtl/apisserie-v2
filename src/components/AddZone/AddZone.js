import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateZone } from '../../redux/actions/zones'
import TextField from '../TextField'
import "./styles.scss"
import { ZONE_API } from '../../constants';

const AddZone = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [order, setOrder] = useState(1)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeZone = (e) => {
    setOrder(Number(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const zone = {
      id: uuid(),
      name,
      order
    }

    API.post(ZONE_API, "/zones", { body: zone })
      .then(() => {
        dispatch(updateZone(zone))
        setName("")
        setOrder(1)
      })
  }

  return (
    <div className="AddZone">
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Nom" value={name} onChange={handleChangeName}  />
        <br />
        <TextField placeholder="Ordre" value={order} onChange={handleChangeZone} type="number" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddZone