// 获取合并reducers的方法
import { combineReducers } from 'redux'
// location 变化触发的 reducer
import locationReducer from './location'

// 获取合并后的 reducers
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

// 该方法注入一个异步reducer
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key))    {
    return
  }
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

// 该方法注入多个 reducer
export const injectReducers = (store, reducerArray) => {
  reducerArray.map(item => injectReducer(store, item))
}

// 默认导出reducers生成器
export default makeRootReducer
