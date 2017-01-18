import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : 'Seed.html',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Seed = require('./Seed').default
      const reducer = require('REDUCER/seed').default
      injectReducer(store, { key: 'seed', reducer })
      cb(null, Seed)
    }, 'seed')
  }
})
