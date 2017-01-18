// 获取 reducer 注入方法
import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./Login').default
      const reducer = require('REDUCER/login').default
      injectReducer(store, { key: 'login', reducer })
      cb(null, Login)
    }, 'login')
  }
})
