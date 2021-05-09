import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../actions/products'
import { TextField, Button } from '../../petate-ui'
import "./styles.scss"
import { PRODUCT_API } from '../../constants';

const AddProduct = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [zone, setZone] = useState(1)

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeZone = (e) => {
    setZone(Number(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const product = {
      id: uuid(),
      name,
      zone
    }

    API.post(PRODUCT_API, "/products", { body: product })
      .then(() => {
        dispatch(updateProduct(product))
        setName("")
        setZone(1)
      })
  }

  return (
    <div className="AddProduct">
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Nom" value={name} onChange={handleChangeName} required />
        <TextField placeholder="Zone" value={zone} onChange={handleChangeZone} type="tel" />
        <Button label="Ajouter" submit />
      </form>
    </div>
  )
}

export default AddProduct