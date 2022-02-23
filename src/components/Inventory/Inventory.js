import { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress } from '@mui/material'
import { Add, Check, Build, AttachMoney, Close } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEdit } from '../Product/hooks';
import { useUpdateProduct } from '../../hooks/products'

const Inventory = () => {
  const { productEdit, openProductEdit } = useProductEdit()
  const products = useSelector(selectProductsByName)
  const [query, setQuery] = useState("")
  const { update, isLoading, productId } = useUpdateProduct()

  const productsToDisplay = products.filter(
    product => product.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderProducts = () => {
    if (!productsToDisplay.length && query.length) {
      return (
        <Card>
          <CardActionArea onClick={() => { openProductEdit(null, query) }} component="div">
            <CardHeader avatar={<Add />} title={`Ajouter "${query}"...`} />
          </CardActionArea>
        </Card>
      )
    }

    return productsToDisplay.map(product => {
      const handleAdminClick = e => {
        e.stopPropagation()
        openProductEdit(product.id)
      }

      const handleCardClick = () => {
        const nextSelected = !product.selected

        update({
          ...product,
          selected: nextSelected,
          discounted: false
        })
      }

      const handleStartIconClick = e => {
        e.stopPropagation()

        update({
          ...product,
          selected: true,
          discounted: true
        })
      }

      const renderStartIcon = () => {
        if (isLoading && productId === product.id) {
          return <CircularProgress size={24} />
        }

        const iconProps = { onClick: handleStartIconClick }

        if (product.selected) {
          if (product.discounted) {
            return (
              <AttachMoney {...iconProps} color="secondary" />
            )
          }

          return <Check {...iconProps} />
        }

        return (
          <AttachMoney {...iconProps} sx={{ opacity: 0.1 }} />
        )
      }
      
      return (
        <Card key={product.id}>
          <CardActionArea onClick={handleCardClick} component="div">
            <CardHeader
              avatar={renderStartIcon()}
              title={product.name}
              action={(
                <IconButton onClick={handleAdminClick} title="Admin">
                  <Build sx={{ opacity: 0.5 }} />
                </IconButton>
              )}
            />
          </CardActionArea>
        </Card>
      )
    })
  }

  return (
    <div className="Inventory">
      <div className="Inventory__search">
        <TextField
          value={query}
          onChange={handleChangeQuery}
          placeholder="Chercher..."
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ right: "8px", opacity: 0.5 }}
              >
                <IconButton onClick={() => setQuery("")}>
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ width: "100%", boxShadow: "0 1px 10px rgba(0, 0, 0, 0.2)" }}
        />
      </div>
      <Stack spacing={1}>
        {renderProducts()}
      </Stack>
      {productEdit}
    </div>
  )
}

export default Inventory
