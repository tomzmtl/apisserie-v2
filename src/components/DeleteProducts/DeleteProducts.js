import { API } from 'aws-amplify'
import { useDispatch, useSelector } from 'react-redux'
import { Delete } from "@material-ui/icons"
import { useLoadProducts } from '../../hooks'
import { deleteProduct } from '../../redux/actions/products'
import Card from '../Card'
import "./styles.scss"

const DeleteProducts = () => {
  useLoadProducts()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  const handleClick = product => () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)

    if (!confirm) {
      return
    }

    API
      .del("productsApi", `/products/object/${product.name}`)
      .then(() => {
        dispatch(deleteProduct(product))
      })
  }

  const renderProducts = () => products
    .map(product => (
      <Card className="DeleteProducts__item" onClick={handleClick(product)} key={product.name}>
        {product.name}
        <Delete />
      </Card>
    ))

  return (
    <div className="DeleteProducts">
      {renderProducts()}
    </div>
  )
}

export default DeleteProducts
