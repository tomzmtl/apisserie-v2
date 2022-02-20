import API from '@aws-amplify/api'
import { Divider, Card, CardActionArea, Stack, CardHeader, IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../actions/products'
import { selectShoppingList } from '../../selectors/products'
import { useProductEditDialog } from '../ProductEditDialog/hooks'
import './styles.scss';

const ShoppingList = () => {
  const { dialog, openDialog } = useProductEditDialog()
  const productsByZone = useSelector(selectShoppingList)
  const dispatch = useDispatch()

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: false }
    
    API.put(PRODUCT_API, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = products => products.map(product => {
    const renderEditBtn = () => {
      if (product.zoneId !== "NONE") {
        return null
      }

      const onClick = e => {
        e.stopPropagation()
        openDialog(product.id)
      }

      return (
        <IconButton onClick={onClick}>
          <Edit />
        </IconButton>
      )
    }
    
    return (
      <Card key={product.id} sx={{ width: "100%" }}>
        <CardActionArea onClick={handleProductClick(product)}>
          <CardHeader
            action={renderEditBtn()}
            title={product.name}
          />
        </CardActionArea>
      </Card>
    )
  })

  
  const renderProductsByZone = productsByZone => productsByZone.map(zone => (
    <div className="ShoppingList__zone" key={zone.id}>
      <Divider textAlign="left" sx={{ mb: 1 }}>{zone.name}</Divider>
      <Stack spacing={1}>
        {renderProducts(zone.products)}
      </Stack>
    </div>
  ))

  return (
    <div className="List">
      <div className="ShoppingList__list">
        {renderProductsByZone(productsByZone)}
      </div>
      {dialog}
    </div>
  )
}

export default ShoppingList;
