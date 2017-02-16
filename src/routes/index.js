import Core from 'COMPONENT/Core'
import { CONTENTNAME } from 'GLOBAL'

const rootPath = CONTENTNAME == '' ? '/' : CONTENTNAME

// 配置路由
export const createRoutes = (store) => ({
  path        : rootPath,
  component   : Core,

  indexRoute  : {
    onEnter: (nextState, replace) => {
      replace(`${CONTENTNAME}/login`)
    }
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./main').default(store),
        require('./login').default(store), 
        { 
          path: `${CONTENTNAME}/redirect`, 
          component: require('VIEW/Redirect').default 
        }, { 
          path: `${CONTENTNAME}/*`, 
          component: require('VIEW/NoFound').default 
        }
      ])
    })
  }
  
})

export default createRoutes
