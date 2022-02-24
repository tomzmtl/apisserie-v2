import { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from "uuid"
import { Drawer, TextField, Paper, Button, Stack,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete, Save, Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
import * as api from '../../api/products'

const NEW_PRODUCT = {
  selected: false,
  discounted: false
}

const makeProductBase = (isCreateMode, existingProduct) => {
  if (isCreateMode) {
    return {
      ...NEW_PRODUCT,
      id: uuid()
    }
  }

  const { zone, ...product } = existingProduct

  return product
}

const Product = ({ productId, onAfterSave, onClose, isOpen, add = null }) => {
  const isEditMode = !!productId
  const isCreateMode = !isEditMode
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const pId = add ? null : productId
  const zones = useSelector(selectZonesByName)
  const product = products.find(p => p.id === productId)
  
  const [name, setName] = useState(add ?? product?.name ?? "")
  const [zoneId, setZoneId] = useState(product?.zoneId || null)

  const options = useMemo(() => [...zones]
    .map(zone => ({ value: zone.id, label: zone.name }))
  , [zones])

  useEffect(() => {
    if (product) {
      setName(product.name)
      setZoneId(product.zoneId)
    } else {
      setName(add ?? "")
      setZoneId(null)
    }
  }, [product, add])
  
  if (!product && add === null) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...makeProductBase(isCreateMode, product),
      name,
      zoneId: zoneId || null
    }

    api.putProduct(body).then(() => {
      dispatch(updateProduct(body))
      onAfterSave?.(isCreateMode ? `${name} ajouté` : `${name} mis à jour`)
    })
  }

  const handleChangeName = e => setName(e.target.value)
  const handleChangeZone = e => setZoneId(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)

    if (!confirm) {
      return
    }

    api.deleteProduct(product.id).then(() => {
      dispatch(deleteProduct(product.id))
      onAfterSave?.(`${name} supprimé`)
    })
  }

  const isNameInvalid = !pId && products.some(
    product => product.name === name
  )

  const nameFieldProps = {
    value: name,
    placeholder: "Name",
    label: "Name",
    onChange: handleChangeName,
    required: true,
    error: isNameInvalid,
    sx: { width: "100%", mb: 2 }
  }

  const deleteBtnProps = {
    onClick: handleDelete,
    endIcon: <Delete />,
    sx: { marginRight: "auto" },
    variant: "outlined",
    color: "error"
  }
  
  const confirmBtnProps = {
    label: pId ? "Mettre à jour" : "Ajouter",
    icon: <Save />,
    type: "submit",
    disabled: isNameInvalid,
    endIcon: <Send />,
    variant: "contained"
  }

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
    >
      <Paper square sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField {...nameFieldProps} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rayon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={zoneId || ""}
              label="Rayon"
              onChange={handleChangeZone}
            >
              <MenuItem value="">Pas de rayon</MenuItem>
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            {pId && <Button {...deleteBtnProps}>Supprimer</Button>}
            <Button {...confirmBtnProps}>{add ? "Ajouter" : "Mettre à jour"}</Button>
          </Stack>
        </form>
      </Paper>
    </Drawer>
  )
}

export default Product
