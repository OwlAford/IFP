import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'
import { API } from 'CONSTANT/globals'

export default (store) => ({
  path : 'main',
  indexRoute : {
    component: require('COMPONENT/Welcome').default 
  },

  getComponents(nextState, cb){
    require.ensure([], require => {
      cb(null, require('COMPONENT/Main').default)
    }, 'main')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Message').default(store),
        require('./BranchManage').default(store)
      ])
    })
  }
})
