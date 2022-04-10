export const selectAppIsLoading = (state) =>
  state.products.isLoading || state.zones.isLoading

export const selectRefreshTimestamp = (state) => state.app.lastRefreshed

export const selectIsDevMode = (state) => state.app.isDevMode
