import { useSelector } from 'react-redux'
import { Card, CardActionArea, Stack, CardHeader, IconButton, CardActions, Chip } from '@mui/material'
import { Check, Build } from '@mui/icons-material'
import { selectProductsByName } from '../../selectors/products'
import "./styles.scss"
import { useProductEditDialog } from '../ProductEditDialog/hooks';
import { useNavigation } from '../../hooks/navigation'
import { useUpdateProduct } from '../../hooks/products'

const ProductAdmin = () => {
  const { dialog } = useProductEditDialog()
  const products = useSelector(selectProductsByName)
  const navigateTo = useNavigation()
  const { update } = useUpdateProduct()

  const renderProducts = () => products
    .map(product => {
      const cardProps = {
        className: "ProductAdmin__item",
        key: product.id
      }

      const handleAdminClick = () => {
        navigateTo(`/product/${product.id}`)
      }

      const handleSelect = () => {
        update({ ...product, selected: !product.selected })
      }

      const selectedFlag = product.selected &&
        <Chip color="success" label="Ajouté" icon={<Check />} />
      
      return (
        <Card {...cardProps}>
          <CardActionArea onClick={handleSelect}>
            <CardHeader
              title={product.name}
              action={selectedFlag}
            />
          </CardActionArea>
          <CardActions className="ProductAdmin__actions">
            <Stack direction="row" justifyContent="space-between">
              <IconButton size="small" onClick={handleAdminClick} title="Admin">
                <Build fontSize="inherit" />
              </IconButton>
            </Stack>
          </CardActions>
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
