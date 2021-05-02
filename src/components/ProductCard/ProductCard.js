import { Delete, Edit } from '@material-ui/icons'
import { API } from 'aws-amplify'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Card from '../Card'
import TextField from '../TextField'
import { useNavigation } from '../../hooks/navigation'
import { PRODUCT_API } from '../../constants'
import { updateProduct } from '../../actions/products'
import { selectZonesByName } from '../../selectors/zones'

const ProductCard = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const products = useSelector(state => state.products)
  const zones = useSelector(selectZonesByName)
  const navigateTo = useNavigation()
  const product = products.find(p => p.id === productId)

  const [name, setName] = useState(product.name)
  const [zoneId, setZoneId] = useState(product.zoneId || null)

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      ...product,
      name,
      zoneId: zoneId || null
    }

    API.put(PRODUCT_API, "/products", { body })
      .then(() => {
        dispatch(updateProduct(body))
        navigateTo('/products')
      })
  }

  const handleChangeName = (e) => setName(e.target.value)

  const handleChangeZone = e => setZoneId(e.target.value)

  const handleDelete = () => {
    const confirm = window.confirm(`Supprimer ${product.name}?`)

    if (!confirm) {
      return
    }

    API
      .del(PRODUCT_API, `/products/object/${product.id}`)
      .then(() => {
        navigateTo('/products')
      })
  }

  const renderZoneOptions = () => {
    const empty = <option key="none" value="">No zone assigned</option>

    return [].concat(empty, zones.map(zone => {
      return <option key={zone.id} value={zone.id}>{zone.name}</option>
    }))
  }

  return (
    <Card>
      <h1>{product.name}</h1>
      <form onSubmit={handleSubmit}>
        <TextField value={name} placeholder="Name" onChange={handleChangeName} />
        <select onChange={handleChangeZone} value={zoneId || ""}>
          {renderZoneOptions()}
        </select>
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