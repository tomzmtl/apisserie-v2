import { uniq } from "lodash-es"
import { selectZones } from "./zones"

export const selectIsProductLoading = state => state.products.isLoading

export const selectProducts = state => state.products.items

export const selectProductsByName = state =>
  selectProducts(state).sort((a, b) => a.name.localeCompare(b.name))

export const selectShoppingList = state => {
  const selectedProducts = selectProducts(state).filter(product => product.selected)

  const zones = selectZones(state)
  const uniqueZoneIds = uniq(zones.map(zone => zone.id ?? "NONE"))
    .map(zoneId => zones.find(zone => zone.id === zoneId))
    .sort((a, b) => a.order < b.order ? -1 : 1)

  return uniqueZoneIds.map(
    zone => ({
      name: zone.name,
      products: selectedProducts.filter(product => product.zoneId === zone.id),
      id: zone.id
    })
  )
  .filter(zone => zone.products.length > 0)
}
