import { DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import { Delete, Edit } from '@material-ui/icons'
import { API } from 'aws-amplify'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../TextField'
import { PRODUCT_API } from '../../constants'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import "./styles.scss"

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

    API
      .del(PRODUCT_API, `/products/object/${product.id}`)
      .then(() => {
        onClose()
        dispatch(deleteProduct(product.id))
      })
  }

  const renderZoneOptions = () => {
    const empty = <option key="none" value="">No zone assigned</option>

    return [].concat(empty, zones.map(zone => {
      return <option key={zone.id} value={zone.id}>{zone.name}</option>
    }))
  }

  return (
    <div className="ProductEdit">
      <DialogTitle id="form-dialog-title">{product.name}</DialogTitle>
      <DialogContent>
        <TextField value={name} placeholder="Name" onChange={handleChangeName} />
        <select onChange={handleChangeZone} value={zoneId || ""}>
          {renderZoneOptions()}
        </select>
      </DialogContent>
      <DialogActions>
        <button onClick={handleSubmit}>
          <Edit /> Update
        </button>
        <button onClick={handleDelete}>
          <Delete /> Delete
        </button>
      </DialogActions>
    </div>
  )
}

export default ProductEdit