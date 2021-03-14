import { API } from 'aws-amplify'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProduct } from '../../redux/actions/products'

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

    const product = { name, zone }

    API.post("api41415b60", "/products", { body: product })
      .then(() => {
        dispatch(updateProduct(product))
        setName("")
        setZone(1)
      })
  }

  return (
    <div className="AddProduct">
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={name} onChange={handleChangeName}  />
        <br />
        <input name="zone" placeholder="Zone" value={zone} onChange={handleChangeZone} type="number" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddProduct