import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'
import { API } from 'CONSTANT/globals'

export default (store) => ({
  path : 'home',
  indexRoute : {
    component: require('COMPONENT/Welcome').default 
  },

  getComponents(nextState, cb){
    require.ensure([], require => {
      const Main = require('COMPONENT/Main').default
      const reducer = require('REDUCER/main').default
      injectReducer(store, { key: 'main', reducer })
      cb(null, Main)
    }, 'main')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // require('./Message').default(store),
        require('./BranchManage').default(store),
        require('./UserManage').default(store)
      ])
    })
  }
})
