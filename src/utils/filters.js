export const isEmptyObject = obj => {
  let name
  for ( name in obj ) {
    return false
  }
  return true
}
