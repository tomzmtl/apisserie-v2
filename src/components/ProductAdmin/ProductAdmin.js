import { useSelector } from 'react-redux'
import { Card, CardActionArea, Stack, CardHeader } from '@mui/material'
import { selectProductsByName } from '../../selectors/products'
import { selectZones } from '../../selectors/zones'
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
            <CardHeader subheader={zone?.name ?? "-"} title={product.name} />
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
