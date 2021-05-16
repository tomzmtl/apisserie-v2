import { useSelector } from 'react-redux'
import { useState } from 'react';
import Product from '../Product';
import './styles.scss';
import { TextField } from '../../petate-ui'
import { selectProductsByName } from '../../selectors/products';

const ProductList = () => {
  const [query, setQuery] = useState("")
  const products = useSelector(selectProductsByName)

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderProducts = () => products
    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    .map(product => {
      return <Product product={product} key={product.id} />
    })

  return (
    <div className="ProductList">
      <div className="ProductList__search">
        <TextField value={query} onChange={handleChangeQuery} placeholder="Chercher..." />
      </div>
      <div className="ProductList__list">
        {renderProducts()}
      </div>
    </div>
  )
}

export default ProductList
