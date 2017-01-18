// 定义一个常量
export const SEED_INCREMENT = 'SEED_INCREMENT'

/*** Actions ***/
export function increment () {
  return {
    type    : SEED_INCREMENT,
    payload : 1
  }
}


/*** Reducer ***/
const initialState = {
  count: 0
}
export default function counterReducer (state = initialState, action) {
  switch (action.type) {
    case SEED_INCREMENT :
      return {
        ...state,
        count: state.count + action.payload
      }

    default:
      return state
  }
}
