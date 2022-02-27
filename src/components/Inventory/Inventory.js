import { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress } from '@mui/material'
import { Add, Check, Edit, AttachMoney, Close } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEdit } from '../Product/hooks';
import { useUpdateProduct } from '../../hooks/products'
import { without } from 'lodash-es'
import ProductCard from '../ProductCard'

const Inventory = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
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
            <CardHeader avatar={<Add color="secondary" />} title={`Ajouter "${query}"...`} />
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
          discounted: false,
          selection: {
            tags: nextSelected ? product.selection.tags : []
          }
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

      const onToggleTag = tag => e => {
        const { tags } = product.selection
        const isSelected = tags.includes(tag)

        update({
          ...product,
          selected: true,
          selection: {
            tags: isSelected ? without(tags, tag) : tags.concat(tag)
          }
        })
      }

      const cardProps = {
        product,
        isLoading: isLoading && product.id === productId,
        isDisabled: isLoading && product.id !== productId,
        onCardClick: handleCardClick,
        onClickEdit: handleAdminClick,
        onClickStartIcon: handleStartIconClick,
        onToggleTag
      }
      
      return <ProductCard {...cardProps} />
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
      {productEditComponents}
    </div>
  )
}

export default Inventory
