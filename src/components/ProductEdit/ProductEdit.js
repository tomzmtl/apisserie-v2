import { Delete, Edit } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Dialog } from '../../petate-ui'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
import "./styles.scss"
import Select from '../../petate-ui/Select'
import * as api from '../../api/products'

const ProductEdit = ({ productId, onClose }) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const zones = useSelector(selectZonesByName)
  const product = products.find(p => p.id === productId)

  const [name, setName] = useState(product ? product.name : null)
  const [zoneId, setZoneId] = useState(product ? product.zoneId : null)

  if (!product) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...product,
      name,
      zoneId: zoneId || null
    }

    api.putProduct(body).then(() => {
      dispatch(updateProduct(body))
      onClose()
    })
  }

  const handleChangeName = (e) => setName(e.target.value)

  const handleChangeZone = e => setZoneId(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)

    if (!confirm) {
      return
    }

    api.deleteProduct(product.id).then(() => {
      onClose()
      dispatch(deleteProduct(product.id))
    })
  }

  const options = [{ label: "Pas de rayon", value: "none" }].concat(
    zones.map(zone => ({ value: zone.id, label: zone.name })
  ))

  return (
    <div className="ProductEdit">
      <form onSubmit={handleSubmit}>
        <Dialog.Content>
          <TextField value={name} placeholder="Name" onChange={handleChangeName} required />
          <Select options={options} onChange={handleChangeZone} value={zoneId || ""} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={handleDelete} icon={<Delete />} danger />
          <Button label="Mettre à jour" icon={<Edit />} submit />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ProductEdit