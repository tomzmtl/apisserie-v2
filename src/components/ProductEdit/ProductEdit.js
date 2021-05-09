import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import { Delete, Edit } from '@material-ui/icons'
import { API } from 'aws-amplify'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../../petate-ui/TextField'
import Button from '../../petate-ui/Button'
import { PRODUCT_API } from '../../constants'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import "./styles.scss"
import Select from '../../petate-ui/Select'

const ProductEdit = ({ productId, onClose }) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
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

    API.put(PRODUCT_API, "/products", { body })
      .then(() => {
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

    API.del(PRODUCT_API, `/products/object/${product.id}`)
      .then(() => {
        onClose()
        dispatch(deleteProduct(product.id))
      })
  }

  const options = [{ label: "Pas de rayon", value: "none" }].concat(
    zones.map(zone => ({ value: zone.id, label: zone.name })
  ))

  return (
    <div className="ProductEdit">
      <DialogTitle id="form-dialog-title">{product.name}</DialogTitle>
      <DialogContent>
        <TextField value={name} placeholder="Name" onChange={handleChangeName} />
        <Select options={options} onChange={handleChangeZone} value={zoneId || ""} />
      </DialogContent>
      <DialogActions>
        <Button label="Supprimer" onClick={handleDelete} icon={<Delete />} />
        <Button label="Mettre à jour" onClick={handleSubmit} icon={<Edit />} />
      </DialogActions>
    </div>
  )
}

export default ProductEdit