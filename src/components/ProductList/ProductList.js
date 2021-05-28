import { useSelector } from 'react-redux'
import { useState } from 'react';
import { ShoppingCart } from '@material-ui/icons';
import Product from '../Product';
import ProductAdd from '../ProductAdd';
import './styles.scss';
import { TextField } from '../../petate-ui'
import { selectIsProductLoading, selectProductsByName } from '../../selectors/products';

const ProductList = () => {
  const [query, setQuery] = useState("")
  const products = useSelector(selectProductsByName)
  const isLoading = useSelector(selectIsProductLoading)

  const showSplash = isLoading || products.length === 0

  const handleChangeQuery = e => {
    setQuery(e.target.value)
  }

  const renderSearchField = () => {
    if (showSplash) {
      return null
    }

    return (
      <div className="ProductList__search">
        <TextField value={query} onChange={handleChangeQuery} placeholder="Chercher..." />
      </div>
    )
  }

  const renderProducts = () => {
    if (showSplash) {
      return (
        <div className="ProductList__splash">
          <ShoppingCart className="ProductList__splashIcon" size="100px" />
        </div>
      )
    }

    return products
      .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
      .map(product => {
        return <Product product={product} key={product.id} />
      })
  }

  return (
    <div className="ProductList">
      {renderSearchField()}
      <div className="ProductList__list">
        {renderProducts()}
      </div>
      {!showSplash && <ProductAdd />}
    </div>
  )
}

export default ProductList
