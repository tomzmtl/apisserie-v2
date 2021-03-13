import products from '../../data/products'

const ProductList = () => {
  return products.map(product => (
    <div>{product.name}</div>
  ))
}

export default ProductList