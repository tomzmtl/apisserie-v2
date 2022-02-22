import { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from "uuid"
import { TextField, Paper, Button, Stack,FormControl
,InputLabel, Select,
MenuItem } from '@mui/material';
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

const Product = ({ productId, onAfterSave, add }) => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const pId = add ? null : productId
  const zones = useSelector(selectZonesByName)
  const product = products.find(p => p.id === productId)
  
  const [name, setName] = useState(add ?? product?.name ?? "")
  const [zoneId, setZoneId] = useState(product?.zoneId || null)

  const options = useMemo(() => zones
    .map(zone => ({ value: zone.id, label: zone.name }))
    .sort((a) => a.value === "NONE" ? -1 : 1)
  , [zones])

  useEffect(() => {
    if (product) {
      setName(product.name)
      setZoneId(product.zoneId ?? "NONE")
    }
  }, [product])
  
  if (!product && !add) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...(add ? { ...NEW_PRODUCT, id: uuid() } : product),
      name,
      zoneId: zoneId === "NONE" ? null : zoneId
    }

    api.putProduct(body).then(() => {
      dispatch(updateProduct(body))
      onAfterSave?.()
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
      onAfterSave?.()
    })
  }

  const isNameInvalid = !pId && products.find(
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
    variant: "container",
    sx: { marginRight: "auto" }
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
            {options.map(option => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
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
  )
}

export default Product
