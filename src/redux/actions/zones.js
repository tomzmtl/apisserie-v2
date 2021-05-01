export const setZones = zones => ({
  type: "SET_ZONES",
  payload: { zones }
})

export const updateZone = zone => ({
  type: "UPDATE_ZONE",
  payload: { zone }
})