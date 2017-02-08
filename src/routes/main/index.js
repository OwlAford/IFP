import { connect } from 'react-redux'
import { injectReducers } from 'STORE/reducers'
import { API } from 'CONSTANT/globals'

export default (store) => ({
  path : 'home',
  indexRoute : {
    component: require('VIEW/Welcome').default
  },

  getComponents(nextState, cb){
    require.ensure([], require => {
      const Main = require('LAYOUT/Main').default
      injectReducers(store, [{ 
        key: 'main', 
        reducer: require('REDUCER/common/main').default
      }, {
        key: 'menu',
        reducer: require('REDUCER/common/menu').default
      }, {
        key: 'bindRole',
        reducer: require('REDUCER/common/bindRole').default
      }, {
        key: 'branchTree',
        reducer: require('REDUCER/common/branchTree').default
      }, {
        key: 'config',
        reducer: require('REDUCER/common/config').default
      }])
      cb(null, Main)
    }, 'main')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./branchManage').default(store),
        require('./userManage').default(store),
        require('./roleManage').default(store),
        require('./postManage').default(store)
      ])
    })
  }
})
