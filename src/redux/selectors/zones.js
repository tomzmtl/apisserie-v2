export const selectZonesByName = state =>
  state.zones.sort((a, b) => a.name.localeCompare(b.name))

export const selectZonesByOrder = state =>
  state.zones.sort((a, b) => a.order < b.order ? -1 : 1)