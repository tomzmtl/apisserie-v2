import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import Product from '../Product';
import { useLoadProducts } from '../../hooks';
import './styles.scss';
import TextField from '../TextField';
import { updateProduct } from '../../redux/actions/products';
import API from '@aws-amplify/api';
import { selectProductsByName } from '../../redux/selectors/products';
import { API_NAME } from '../../constants';

const ProductList = () => {
  useLoadProducts()
  const [query, setQuery] = useState("")
  const products = useSelector(selectProductsByName)
  const dispatch = useDispatch()

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const handleProductClick = product => () => {
    const updatedProduct = { ...product, selected: !product.selected }
    
    API.put(API_NAME, "/products", { body: updatedProduct })
      .then(() => {
        dispatch(updateProduct(updatedProduct))
      })
  }

  const renderProducts = () => products
    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    .map(product => {
      return <Product product={product} key={product.id} onClick={handleProductClick(product)} />
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
