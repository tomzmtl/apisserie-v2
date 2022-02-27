import { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from "uuid"
import { Drawer, TextField, Paper, Stack,FormControl, InputLabel, Select, MenuItem, Divider, Chip, InputAdornment, IconButton } from '@mui/material';
import { Add, Delete, Save, Send } from '@mui/icons-material';
import { LoadingButton } from "@mui/lab"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
import * as api from '../../api/products'
import { uniq, without } from 'lodash-es';

const NEW_PRODUCT = {
  selected: false,
  discounted: false
}

const INITIAL_LOADING = {
  delete: false,
  save: false
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
  const [zoneId, setZoneId] = useState(product?.zoneId ?? null)
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState(product?.tags ?? [])

  const [isLoading, setIsLoading] = useState(INITIAL_LOADING)

  const handleClose = () => {
    onClose()
    setIsLoading(INITIAL_LOADING)
    setTag("")
  }

  const options = useMemo(() => [...zones]
    .map(zone => ({ value: zone.id, label: zone.name }))
  , [zones])

  useEffect(() => {
    if (product) {
      setName(product.name)
      setZoneId(product.zoneId)
      setTags(product.tags)
    } else {
      setName(add ?? "")
      setZoneId(null)
      setTags([])
    }
  }, [product, add])
  
  if (!product && add === null) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, save: true })
    
    const body = {
      ...makeProductBase(isCreateMode, product),
      name,
      zoneId: zoneId || null,
      tags
    }
    
    api.putProduct(body).then(() => {
      dispatch(updateProduct(body))
      onAfterSave?.(isCreateMode ? `${name} ajouté` : `${name} mis à jour`)
    })
    .finally(() => {
      setIsLoading({ ...isLoading, save: false })
    })
  }

  const handleChangeName = e => setName(e.target.value)
  const handleChangeZone = e => setZoneId(e.target.value)
  const handleChangeTag = e => setTag(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)
    
    if (!confirm) {
      return
    }
    
    setIsLoading({ ...isLoading, delete: true })
    
    api.deleteProduct(product.id).then(() => {
      dispatch(deleteProduct(product.id))
      onAfterSave?.(`${name} supprimé`)
    })
    .finally(() => {
      setIsLoading({ ...isLoading, delete: false })
    })
  }

  const handleAddTag = () => {
    setTags(uniq([...tags, tag]))
    setTag("")
  }

  const handleDeleteTag = tag => (e) => {
    setTags(without(tags, tag))
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
    fullWidth: true,
  }

  const addTagFieldProps = {
    value: tag,
    placeholder: "Add tag",
    label: "Add tag",
    onChange: handleChangeTag,
    fullWidth: true,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end" disabled={tags.length === 0}>
          <IconButton onClick={handleAddTag}>
            <Add />
          </IconButton>
        </InputAdornment>
      )
    },
    sx: { mt: 2 }
  }

  const deleteBtnProps = {
    onClick: handleDelete,
    endIcon: <Delete />,
    sx: { marginRight: "auto" },
    variant: "outlined",
    color: "error",
    loading: isLoading.delete,
    disabled: isLoading.save
  }
  
  const confirmBtnProps = {
    label: pId ? "Mettre à jour" : "Ajouter",
    icon: <Save />,
    type: "submit",
    disabled: isNameInvalid || isLoading.delete,
    endIcon: <Send />,
    variant: "contained",
    loading: isLoading.save
  }

  const renderTags = () => tags.map(tag => (
    <Chip label={tag} onDelete={handleDeleteTag(tag)} key={tag} sx={{ mr: 1 }} />
  ))

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={handleClose}
    >
      <Paper square sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField {...nameFieldProps} />
          <FormControl fullWidth sx={{ mt: 2 }}>
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

          <Divider sx={{ my: 2 }} />
          {renderTags()}
          <TextField {...addTagFieldProps} />
          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            {pId && <LoadingButton {...deleteBtnProps}>Supprimer</LoadingButton>}
            <LoadingButton {...confirmBtnProps}>
              {add ? "Ajouter" : "Mettre à jour"}
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Drawer>
  )
}

export default Product
