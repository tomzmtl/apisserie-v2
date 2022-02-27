import { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputAdornment, TextField, Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress, Paper, Chip } from '@mui/material'
import { Add, Check, Edit, AttachMoney, Close } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEdit } from '../Product/hooks';
import { useUpdateProduct } from '../../hooks/products'
import { without } from 'lodash-es'

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

      const renderTags = () => {
        if (product.tags.length === 0) {
          return null
        }

        const chips = product.tags.map(tag => {
          const isSelected = product.selection.tags.includes(tag)

          const chipProps = {
            label: tag,
            onClick: isLoading ? null : onToggleTag(tag),
            key: tag,
            variant: isSelected ? undefined : "outlined",
            color: isSelected ? "secondary" : undefined,
            sx: { opacity: isLoading ? 0.5 : 1}
          }

          return (
            <Chip {...chipProps} />
          )
        })

        return (
          <Stack direction="row" spacing={1} sx={{ p: 1, pl: 2 }}>
            {chips}
          </Stack>
        )
      }
      
      return (
        <Card key={product.id} sx={{ opacity: isLoading && product.id !== productId ? 0.3 : 1 }}>
          <CardActionArea
            onClick={isLoading ? null : handleCardClick}
            disableRipple={isLoading && product.id !== productId}
            component="div"
          >
            <CardHeader
              avatar={renderStartIcon()}
              title={product.name}
              action={(
                <IconButton onClick={handleAdminClick} title="Admin">
                  <Edit sx={{ opacity: product.zoneId ? 0.1 : 0.5 }} />
                </IconButton>
              )}
            />
          </CardActionArea>
          {renderTags()}
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
      {productEditComponents}
    </div>
  )
}

export default Inventory
