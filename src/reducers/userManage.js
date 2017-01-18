// 定义一个常量
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

/*** Actions ***/
export function increment () {
  return {
    type    : COUNTER_INCREMENT,
    payload : 1
  }
}


/*** Reducer ***/
const initialState = {
  count: 0
}
export default function counterReducer (state = initialState, action) {
  switch (action.type) {
    case COUNTER_INCREMENT :
      return {
        ...state,
        count: state.count + action.payload
      }

    default:
      return state
  }
}
