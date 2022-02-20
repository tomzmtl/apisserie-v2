import { useSelector } from 'react-redux'
import { Card, CardActionArea, Stack, CardHeader, IconButton, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Check, Build, AttachMoney } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEditDialog } from '../ProductEditDialog/hooks';
import { useNavigation } from '../../hooks/navigation'
import { useUpdateProduct } from '../../hooks/products'

const useStyles = makeStyles(() => ({
  cardHeaderAction: { margin: "auto" }
}));

const ProductAdmin = () => {
  const { dialog } = useProductEditDialog()
  const products = useSelector(selectProductsByName)
  const navigateTo = useNavigation()
  const { update, isLoading, productId } = useUpdateProduct()
  const classes = useStyles()

  const renderProducts = () => products
    .map(product => {
      const cardProps = {
        className: "ProductAdmin__item",
        key: product.id
      }

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
              <AttachMoney color="success" />
            )
          }

          return <Check />
        }

        return (
          <AttachMoney sx={{ opacity: 0.1 }} />
        )
      }
      
      return (
        <Card {...cardProps}>
          <CardActionArea onClick={handleCardClick}>
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
              classes={{
                action: classes.cardHeaderAction
              }}
            />
          </CardActionArea>
        </Card>
      )
    })

  return (
    <div className="ProductAdmin">
      <Stack spacing={1}>
        {renderProducts()}
      </Stack>
      {dialog}
    </div>
  )
}

export default ProductAdmin
