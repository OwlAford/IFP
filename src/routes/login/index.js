import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('VIEW/Login').default
      const LoginReducer = require('REDUCER/common/login').default
      injectReducer(store, { 
      	key: 'login', 
      	reducer: LoginReducer 
      })
      cb(null, Login)
    }, 'login')
  }
})
  