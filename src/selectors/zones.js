import { sortBy } from "lodash-es"

export const selectZones = state => state.zones.items

export const selectZonesByName = state => sortBy(selectZones(state), ['name'])

export const selectZonesByOrder = state => sortBy(selectZones(state), ['order'])
