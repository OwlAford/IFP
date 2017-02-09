import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : 'relationSet.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PolicySettings = require('VIEW/PolicySettings').default
      const reducer = require('REDUCER/policySettings').default
      injectReducer(store, { key: 'policySettings', reducer })
      cb(null, PolicySettings)
    }, 'policySettings')
  }
})
