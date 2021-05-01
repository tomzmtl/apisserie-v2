import { useSelector } from 'react-redux'
import { useNavigation } from '../../hooks'
import { selectProductsByName } from '../../redux/selectors/products'
import Card from '../Card'
import { useLoadProducts } from '../../hooks';
import { useLoadZones } from '../../hooks/zones';
import "./styles.scss"

const EditProducts = () => {
  useLoadProducts()
  useLoadZones()
  
  const products = useSelector(selectProductsByName)
  const navigateTo = useNavigation()

  const renderProducts = () => products
    .map(product => (
      <Card className="DeleteProducts__item" onClick={() => navigateTo(`/products/${product.id}`)} key={product.id}>
        {product.name}
      </Card>
    ))

  return (
    <div className="EditProducts">
      {renderProducts()}
    </div>
  )
}

export default EditProducts
