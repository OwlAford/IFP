const LOCATION_CHANGE = 'LOCATION_CHANGE'

export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch({
  	type    : LOCATION_CHANGE,
    payload : nextLocation
  })
}

export default (state = null, action) => action.type === LOCATION_CHANGE ? action.payload : state
