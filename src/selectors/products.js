export const selectProductsByName = state =>
  state.products.sort((a, b) => a.name.localeCompare(b.name))

export const selectSelectedProductsByZoneOrder = state => {
  return state.products.filter(product => product.selected).sort((a, b) => {
    const zoneA = state.zones.find(zone => zone.id === a.zoneId)
    const zoneB = state.zones.find(zone => zone.id === b.zoneId)

    if (!zoneA || !zoneA.order) {
      return 1
    }

    if (!zoneB || !zoneB.order) {
      return -1
    }

    return zoneA.order < zoneB.order ? -1 : 1
  })
}
