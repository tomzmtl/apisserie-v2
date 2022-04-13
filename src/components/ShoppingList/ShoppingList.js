import { Divider, Stack } from "@mui/material"
import { useSelector } from "react-redux"
import { selectShoppingList } from "../../selectors/products"
import { useProductEdit } from "../Product/hooks"
import "./styles.scss"
import ProductCard from "../ProductCard"
import { PlaylistAddCheck } from "@mui/icons-material"

const ShoppingList = () => {
  const { productEditComponents, openProductEdit } = useProductEdit()
  const productsByZone = useSelector(selectShoppingList)

  const renderProducts = (products) =>
    products.map((product) => {
      const cardProps = {
        key: product.id,
        product,
        onClickEdit: () => {
          openProductEdit(product.id)
        },
        disableStartIconClick: true,
      }

      return <ProductCard {...cardProps} />
    })

  const renderProductsByZone = (productsByZone) => {
    if (!productsByZone.length) {
      return (
        <PlaylistAddCheck
          color="disabled"
          sx={{
            display: "block",
            margin: "auto",
            mt: 12,
            fontSize: 300,
            opacity: 0.25,
          }}
        />
      )
    }

    return productsByZone.map((zone) => (
      <div className="ShoppingList__zone" key={zone.id}>
        <Divider textAlign="left" sx={{ mb: 1 }}>
          {zone.name}
        </Divider>
        <Stack spacing={1} sx={{ mb: 2 }}>
          {renderProducts(zone.products)}
        </Stack>
      </div>
    ))
  }

  return (
    <div className="List">
      <div className="ShoppingList__list">
        {renderProductsByZone(productsByZone)}
      </div>
      {productEditComponents}
    </div>
  )
}

export default ShoppingList
