import { Divider, Stack } from "@mui/material"
import { useSelector } from 'react-redux'
import { selectShoppingList } from '../../selectors/products'
import { useProductEdit } from '../Product/hooks';
import './styles.scss';
import { useUpdateProduct } from '../../hooks/products'
import ProductCard from "../ProductCard";

const ShoppingList = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
  const productsByZone = useSelector(selectShoppingList)
  const { unselect, productId, isLoading } = useUpdateProduct()

  const handleProductClick = product => () => { unselect(product) }
  
  const renderProducts = products => products.map(product => {
    const cardProps = {
      key: product.id,
      product,
      onCardClick: handleProductClick(product),
      onClickEdit: () => { openProductEdit(product.id) },
      isLoading: isLoading && productId === product.id,
      isDisabled: isLoading && product.id !== productId,
    }

    return (
      <ProductCard {...cardProps} />
    )
  })
  
  const renderProductsByZone = productsByZone => productsByZone.map(zone => (
    <div className="ShoppingList__zone" key={zone.id}>
      <Divider textAlign="left" sx={{ mb: 1 }}>{zone.name}</Divider>
      <Stack spacing={1} sx={{ mb: 2 }} >
        {renderProducts(zone.products)}
      </Stack>
    </div>
  ))

  return (
    <div className="List">
      <div className="ShoppingList__list">
        {renderProductsByZone(productsByZone)}
      </div>
      {productEditComponents}
    </div>
  )
}

export default ShoppingList;
