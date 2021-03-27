import { API } from 'aws-amplify'
import uuid from 'uuid/v4'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../redux/actions/products'
import TextField from '../TextField'
import "./styles.scss"

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

    API.post("productsApi", "/products", { body: product })
      .then(() => {
        dispatch(updateProduct(product))
        setName("")
        setZone(1)
      })
  }

  return (
    <div className="AddProduct">
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Nom" value={name} onChange={handleChangeName}  />
        <br />
        <TextField placeholder="Zone" value={zone} onChange={handleChangeZone} type="tel" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddProduct