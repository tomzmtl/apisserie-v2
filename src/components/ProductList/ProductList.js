import { useSelector } from 'react-redux'
import { useState } from 'react';
import Product from '../Product';
import { useLoadProducts } from '../../hooks';
import './styles.scss';
import TextField from '../TextField';

const ProductList = () => {
  const [query, setQuery] = useState("")
  useLoadProducts()
  const products = useSelector(state => state.products)

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderProducts = () => products
    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    .map(product => <Product product={product} key={product.name} />)

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
