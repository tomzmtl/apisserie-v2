import { Divider, Card, CardActionArea, Stack, CardHeader, IconButton } from "@mui/material"
import { Edit, AttachMoney, Check } from "@mui/icons-material"
import { useSelector } from 'react-redux'
import { selectShoppingList } from '../../selectors/products'
import { useProductEdit } from '../Product/hooks';
import './styles.scss';
import { useUpdateProduct } from '../../hooks/products'

const ShoppingList = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
  const productsByZone = useSelector(selectShoppingList)
  const { update } = useUpdateProduct()

  const handleProductClick = product => () => {
    update({ ...product, selected: false })
  }

  const renderProducts = products => products.map(product => {
    const renderEditBtn = () => {
      if (product.zoneId !== "NONE") {
        return null
      }

      const onClick = e => {
        e.stopPropagation()
        openProductEdit(product.id)
      }

      return (
        <IconButton onClick={onClick}>
          <Edit />
        </IconButton>
      )
    }

    const renderStartIcon = () => {
      if (product.discounted) {
        return <AttachMoney color="secondary" />
      }

      return <Check sx={{ opacity: 0.25 }} />
    }
    
    return (
      <Card key={product.id}>
        <CardActionArea onClick={handleProductClick(product)} component="div">
          <CardHeader
            avatar={renderStartIcon()}
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
      <Stack spacing={1} sx={{ mb: 2 }} >
        {renderProducts(zone.products)}
      </Stack>
    </div>
  ))

  return (
    <div className="List">
      <div className="ShoppingList__list">
        {renderProductsByZone(productsByZone)}
      </div>
      {productEditComponents}
    </div>
  )
}

export default ShoppingList;
