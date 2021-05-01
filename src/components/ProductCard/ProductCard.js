import { Delete, Edit } from '@material-ui/icons'
import { API } from 'aws-amplify'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Card from '../Card'
import TextField from '../TextField'
import { useNavigation } from '../../hooks'
import { PRODUCT_API } from '../../constants'
import { deleteProduct, updateProduct } from '../../redux/actions/products'

const ProductCard = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const products = useSelector(state => state.products)
  const navigateTo = useNavigation()
  const product = products.find(p => p.id === productId)
  const [name, setName] = useState(product.name)

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...product,
      name
    }

    API.put(PRODUCT_API, "/products", { body })
      .then(() => {
        dispatch(updateProduct({
          ...product,
          name
        }))
        navigateTo('/products')
      })
  }

  const handleChangeName = (e) => setName(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)

    if (!confirm) {
      return
    }

    API
      .del(PRODUCT_API, `/products/object/${product.id}`)
      .then(() => {
        dispatch(deleteProduct(product.id))
        navigateTo('/products')
      })
  }

  return (
    <Card>
      <h1>{product.name}</h1>
      <form onSubmit={handleSubmit}>
        <TextField value={name} placeholder="Name" onChange={handleChangeName} />
        <button type="submit">
          <Edit /> Update
        </button>
      </form>
      <br/><br/>
      <button onClick={handleDelete}>
        <Delete /> Delete
      </button>
    </Card>
  )
}

export default ProductCard