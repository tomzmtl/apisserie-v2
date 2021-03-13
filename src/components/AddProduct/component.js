import { API } from 'aws-amplify'
import { useState } from 'react'

const AddProduct = () => {
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

    API.post("apisserieapi", "/products", {
      body: { name, zone }
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