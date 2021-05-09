export const SET_IS_LOADING = "ZONES.SET_IS_LOADING"

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  payload: { isLoading }
})

export const setZones = zones => ({
  type: "SET_ZONES",
  payload: { zones }
})

export const updateZone = zone => ({
  type: "UPDATE_ZONE",
  payload: { zone }
})