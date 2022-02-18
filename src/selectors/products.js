import { uniq } from "lodash-es"
import { selectZones } from "./zones"

export const selectIsProductLoading = state => state.products.isLoading

export const selectProducts = state => state.products.items

export const selectProductsByName = state =>
  selectProducts(state).sort((a, b) => a.name.localeCompare(b.name))

export const selectProductListGroupedByZone = state => {
  const selectedProducts = selectProducts(state).filter(product => product.selected)
  const zones = selectZones(state)
  const uniqueZoneIds = uniq(zones.map(zone => zone.id ?? "UNKNOWN"))
    .map(zoneId => zones.find(zone => zone.id === zoneId))
    .sort()

  return uniqueZoneIds.map(
    zone => ({
      name: zone.name,
      products: selectedProducts.filter(product => product.zoneId === zone.id)
    })
  )
  .filter(zone => zone.products.length > 0)
}
