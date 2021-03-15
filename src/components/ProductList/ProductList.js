import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import Product from '../Product';
import { useLoadProducts } from '../../hooks';
import './styles.scss';
import TextField from '../TextField';
import { updateProduct } from '../../redux/actions/products';
import API from '@aws-amplify/api';

const ProductList = () => {
  useLoadProducts()
  const [query, setQuery] = useState("")
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: !product.selected }
    
    API.put("api41415b60", "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = () => products
    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(product => {
      return <Product product={product} key={product.name} onClick={handleProductClick(product)} />
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
