export const selectProductsByName = state =>
  state.products.sort((a, b) => a.name.localeCompare(b.name))