import { selectZones } from "./zones"

export const selectIsProductLoading = state => state.products.isLoading

export const selectProducts = state => state.products.items

export const selectProductsByName = state =>
  selectProducts(state).sort((a, b) => a.name.localeCompare(b.name))

export const selectSelectedProductsByZoneOrder = state => {
  return selectProducts(state).filter(product => product.selected).sort((a, b) => {
    const zoneA = selectZones(state).find(zone => zone.id === a.zoneId)
    const zoneB = selectZones(state).find(zone => zone.id === b.zoneId)

    if (!zoneA || !zoneA.order) {
      return 1
    }

    if (!zoneB || !zoneB.order) {
      return -1
    }

    return zoneA.order < zoneB.order ? -1 : 1
  })
}
