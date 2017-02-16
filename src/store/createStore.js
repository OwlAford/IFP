// applyMiddleware 为应用middleware中间件方法
// compose 一般用于将多个middleware中间件合并
import { applyMiddleware, compose, createStore } from 'redux'
// redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决edux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
// 每次action操作及对应的state变化，都可以在控制台打印打印
import createLogger from 'redux-logger'

import requester from 'MIDDLEWARE/requester'

export default (initialState = {}) => {
  // store增强器扩展
  const enhancers = []
  // 定义合并增强器方法用户合并enhancers
  let composeEnhancers = compose

  let middleware = [thunk, requester]

  // 在开发环境并且开启devtools的条件下，替换成devtools的增强器扩展
  if (__DEV__) {
    middleware = [thunk, requester, createLogger()]
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // 初始化store状态管理器
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  // 定义一个异步的 reducuers 容器
  store.asyncReducers = {}
  // 取消订阅，可调用 store.unsubscribeHistory()，浏览器 History 监听url变化，实时更新store
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // 模块热替换下，store替换合并异步reducers后的新reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
