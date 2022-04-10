export const REFRESH = "REFRESH"
export const TOGGLE_DEV_MODE = "TOGGLE_DEV_MODE"

export const refresh = () => ({
  type: REFRESH,
  payload: {},
})

export const toggleDevMode = () => ({
  type: TOGGLE_DEV_MODE,
  payload: {},
})
