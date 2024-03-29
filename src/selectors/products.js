import { uniq } from "lodash-es"
import { selectZones } from "./zones"

export const selectIsProductLoading = (state) => state.products.isLoading

export const selectProducts = (state) => state.products.items

export const selectProductsByName = (state) =>
  selectProducts(state).sort((a, b) => a.name.localeCompare(b.name))

export const selectShoppingList = (state) => {
  const selectedProducts = selectProducts(state).filter(
    (product) => product.selected
  )

  const zones = selectZones(state)

  const uniqueZoneIds = uniq(zones.map((zone) => zone.id))
    .map((zoneId) => zones.find((zone) => zone.id === zoneId))
    .sort((a, b) => (a.order < b.order ? -1 : 1))

  return uniqueZoneIds
    .map((zone) => ({
      name: zone.name,
      products: selectedProducts.filter(
        (product) => product.zoneId === zone.id
      ),
      id: zone.id,
    }))
    .concat({
      name: "Autres",
      products: selectedProducts.filter((product) => !product.zoneId),
      id: "NONE",
    })
    .filter((zone) => zone.products.length > 0)
}

export const selectProductsById = (state) => {
  return selectProducts(state).reduce((productsById, product) => {
    productsById[product.id] = product
    return productsById
  }, {})
}

export const selectProductsByZoneId = (state) => {
  const products = selectProducts(state)
  const zones = selectZones(state)

  const productsByZoneId = {}

  for (const zone of zones) {
    productsByZoneId[zone.id] = products.filter(
      (product) => product.zoneId === zone.id
    )
  }

  return productsByZoneId
}
