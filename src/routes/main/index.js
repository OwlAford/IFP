import { connect } from 'react-redux'
import { injectReducers } from 'STORE/reducers'
import { API } from 'CONSTANT/globals'

export default (store) => ({
  path : 'home',
  indexRoute : {
    component: require('COMPONENT/Welcome').default 
  },

  getComponents(nextState, cb){
    require.ensure([], require => {
      const Main = require('COMPONENT/Main').default
      injectReducers(store, [{ 
        key: 'main', 
        reducer: require('REDUCER/common/main').default
      }, {
        key: 'menu',
        reducer: require('REDUCER/common/menu').default
      }, {
        key: 'branch',
        reducer: require('REDUCER/common/branch').default
      }, {
        key: 'config',
        reducer: require('REDUCER/common/config').default
      }, {
        key: 'role',
        reducer: require('REDUCER/common/role').default
      }])
      cb(null, Main)
    }, 'main')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./branchManage').default(store),
        require('./userManage').default(store)
      ])
    })
  }
})
