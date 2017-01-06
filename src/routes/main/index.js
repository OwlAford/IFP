import { connect } from 'react-redux'
import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : '',
  // path : 'main',
  getComponents(nextState, cb){
    require.ensure([], require => {
      cb(null, require('COMPONENT/Main').default)
    }, 'main')
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Message').default(store),
        // require('./Review').default(store)
      ])
    })
  }
})
