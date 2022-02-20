import { useSelector } from 'react-redux'
import { selectProductsByName } from '../../selectors/products'
import { selectZones } from '../../selectors/zones'
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import "./styles.scss"
import { useProductEditDialog } from '../ProductEditDialog/hooks';
import { useNavigation } from '../../hooks/navigation'

const ProductAdmin = () => {
  const { dialog } = useProductEditDialog()
  const products = useSelector(selectProductsByName)
  const zones = useSelector(selectZones)
  const navigateTo = useNavigation()

  const renderProducts = () => products
    .map(product => {
      const zone = zones.find(zone => zone.id === product.zoneId)

      const cardProps = {
        className: "ProductAdmin__item",
        key: product.id
      }
      
      return (
        <Card {...cardProps}>
          <CardActionArea onClick={() => { navigateTo(`/product/${product.id}`) }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography color="text.secondary">
                {zone?.name ?? "-"}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </CardActionArea>
        </Card>
      )
    })

  return (
    <div className="ProductAdmin">
      {renderProducts()}
      {dialog}
    </div>
  )
}

export default ProductAdmin
