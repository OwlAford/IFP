export const isEmptyObject = obj => {
  let name
  for ( name in obj ) {
    return false
  }
  return true
}

export const formatDateTime = text => {
  return `${text.substring(0, 4)}/${text.substring(4, 6)}/${text.substring(6, 8)} ${text.substring(8, 10)}:${text.substring(10, 12)}`
}
