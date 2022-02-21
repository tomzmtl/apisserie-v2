import { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Check, Build, AttachMoney, Close } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEditDialog } from '../ProductEditDialog/hooks';
import { useNavigation } from '../../hooks/navigation'
import { useUpdateProduct } from '../../hooks/products'

const useStyles = makeStyles(() => ({
  cardHeaderAction: { margin: "auto" }
}));

const Inventory = () => {
  const { dialog } = useProductEditDialog()
  const products = useSelector(selectProductsByName)
  const [query, setQuery] = useState("")
  const navigateTo = useNavigation()
  const { update, isLoading, productId } = useUpdateProduct()
  const classes = useStyles()

  const productsToDisplay = products.filter(
    product => product.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderProducts = () => productsToDisplay
    .map(product => {
      const handleAdminClick = e => {
        e.stopPropagation()
        navigateTo(`/product/${product.id}`)
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

        if (product.selected) {
          if (product.discounted) {
            return (
              <AttachMoney color="secondary" />
            )
          }

          return <Check />
        }

        return (
          <AttachMoney sx={{ opacity: 0.1 }} />
        )
      }
      
      return (
        <Card key={product.id}>
          <CardActionArea onClick={handleCardClick} component="div">
            <CardHeader
              avatar={(
                <IconButton onClick={handleStartIconClick}>
                  {renderStartIcon()}
                </IconButton>
              )}
              title={product.name}
              action={(
                <IconButton onClick={handleAdminClick} title="Admin">
                  <Build sx={{ opacity: 0.5 }} />
                </IconButton>
              )}
              classes={{ action: classes.cardHeaderAction }}
              sx={{ padding: "8px" }}
            />
          </CardActionArea>
        </Card>
      )
    })

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
      {dialog}
    </div>
  )
}

export default Inventory
