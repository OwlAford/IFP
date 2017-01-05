import CoreLayout from 'LAYOUT/CoreLayout'
import { API } from 'CONSTANT/globals'

const rootPath = (API.CONTENTNAME == '') ? '/' : API.CONTENTNAME

// 配置路由
export const createRoutes = (store) => ({
  path        : rootPath,
  component   : CoreLayout,

  indexRoute  : {
    onEnter: (nextState,replace) => {
      replace(API.CONTENTNAME + '/login')
    }
  },

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./main').default(store),
        { 
          path:  API.CONTENTNAME + '/login', 
          component: require('COMPONENT/Login').default 
        }, { 
          path: API.CONTENTNAME + '/redirect', 
          component: require('COMPONENT/Redirect').default 
        }, { 
          path: API.CONTENTNAME + '/*', 
          component: require('COMPONENT/NoFound').default 
        }
      ])
    })
  }
  
})

export default createRoutes
