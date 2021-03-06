import { Delete, Save } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from "uuid"
import { Button, TextField, Dialog } from '../../petate-ui'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
import "./styles.scss"
import Select from '../../petate-ui/Select'
import * as api from '../../api/products'

const ProductEdit = ({ productId, onClose = null }) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const zones = useSelector(selectZonesByName)
  const product = productId
    ? products.find(p => p.id === productId)
    : { id: uuid(), selected: false, discounted: false }

  const [name, setName] = useState(product.name || "")
  const [zoneId, setZoneId] = useState(product.zoneId || null)

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...product,
      name,
      zoneId: zoneId || null
    }

    const existingProduct = !productId && products.find(p => p.name.toLowerCase() === name.toLowerCase())

    if (existingProduct) {
      window.alert("Ce produit existe déjà")
    } else {
      api.putProduct(body).then(() => {
        dispatch(updateProduct(body))
        onClose?.()
  
        if (!productId) {
          setName("")
          setZoneId(null)
        }
      })
    }
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
          {productId && <Button onClick={handleDelete} icon={<Delete />} variant="cancel" />}
          <Button label={productId ? "Mettre à jour" : "Ajouter"} icon={<Save />} submit variant="confirm" />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ProductEdit