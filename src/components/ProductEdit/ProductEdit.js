import { Delete, Save } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from "uuid"
import { Button, TextField, Dialog } from '../../petate-ui'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
import "./styles.scss"
import Select from '../../petate-ui/Select'
import * as api from '../../api/products'

const ProductEdit = ({ productId, onClose = null, prefillText = "" }) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const zones = useSelector(selectZonesByName)
  const product = products.find(p => p.id === productId)

  const [name, setName] = useState(product?.name ?? prefillText)
  const [zoneId, setZoneId] = useState(product?.zoneId || null)

  useEffect(() => {
    if (prefillText) {
      setName(prefillText)
    }
  }, [prefillText])

  const isCreateMode = !productId

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      id: uuid(),
      selected: false,
      discounted: false,
      name,
      zoneId: zoneId || null
    }

    const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase())

    if (existingProduct) {
      window.alert("Ce produit existe déjà")
    } else {
      api.putProduct(body).then(() => {
        dispatch(updateProduct(body))
        onClose?.()
  
        if (isCreateMode) {
          setName("")
          setZoneId(null)
        }
      })
    }
  }

  const handleChangeName = e => setName(e.target.value)
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

  const options = zones.map(zone => ({ value: zone.id, label: zone.name }))

  const isNameInvalid = !productId && products.find(product => product.name === name)

  const nameFieldProps = {
    value: name,
    placeholder: "Name",
    onChange: handleChangeName,
    required: true,
    isInvalid: isNameInvalid
  }

  const confirmBtnProps = {
    label: productId ? "Mettre à jour" : "Ajouter",
    icon: <Save />,
    submit: true,
    variant: "confirm",
    disabled: isNameInvalid
  }

  return (
    <div className="ProductEdit">
      <form onSubmit={handleSubmit}>
        <Dialog.Content>
          <TextField {...nameFieldProps} />
          <Select options={options} onChange={handleChangeZone} value={zoneId || ""} />
        </Dialog.Content>
        <Dialog.Actions>
          {productId && <Button onClick={handleDelete} icon={<Delete />} variant="cancel" />}
          <Button {...confirmBtnProps} />
        </Dialog.Actions>
      </form>
    </div>
  )
}

export default ProductEdit
