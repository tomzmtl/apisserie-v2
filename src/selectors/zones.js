export const selectZones = state => state.zones.items

export const selectZonesByName = state =>
  selectZones(state).sort((a, b) => a.name.localeCompare(b.name))

export const selectZonesByOrder = state =>
  selectZones(state).sort((a, b) => a.order < b.order ? -1 : 1)