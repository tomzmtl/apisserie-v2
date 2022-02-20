import { useState, useEffect, useMemo } from 'react'
import { TextField, Card, Typography, Button, Stack } from '@mui/material';
import { Delete, Save, Send, ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { deleteProduct, updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'
import { selectProducts } from '../../selectors/products'
// import "./styles.scss"
import Select from '../../petate-ui/Select'
import * as api from '../../api/products'
import { useNavigation } from '../../hooks/navigation';

const Product = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigation()
  const products = useSelector(selectProducts)
  const { productId } = useParams()
  const zones = useSelector(selectZonesByName)
  const product = products.find(p => p.id === productId)
  
  const [name, setName] = useState(product?.name ?? "")
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
  
  if (!product) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...product,
      name,
      zoneId: zoneId === "NONE" ? null : zoneId
    }

    api.putProduct(body).then(() => {
      dispatch(updateProduct(body))
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
      navigateTo("/products")
      dispatch(deleteProduct(product.id))
    })
  }

  const isNameInvalid = !productId && products.find(
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

  const backBtn = {
    onClick: () => navigateTo("/products"),
    startIcon: <ArrowBack />
  }

  const deleteBtnProps = {
    onClick: handleDelete,
    endIcon: <Delete />,
    variant: "container"
  }
  
  const confirmBtnProps = {
    label: productId ? "Mettre à jour" : "Ajouter",
    icon: <Save />,
    type: "submit",
    disabled: isNameInvalid,
    endIcon: <Send />,
    variant: "contained"
  }

  return (
    <Card>
      <Button {...backBtn}>Produits</Button>
      <Typography variant="h4" component="div" sx={{ mb: 5 }}>
        {product.name}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField {...nameFieldProps} />
        <Select options={options} onChange={handleChangeZone} value={zoneId || ""} sx={{ mb: 2 }} label="Rayon" />
        <Stack direction="row" spacing={2} sx={{ mt: 5 }} justifyContent="space-between">
          {productId && <Button {...deleteBtnProps}>Supprimer</Button>}
          <Button {...confirmBtnProps}>Mettre à jour</Button>
        </Stack>
      </form>
    </Card>
  )
}

export default Product
