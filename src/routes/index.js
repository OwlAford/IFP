import { CONTENTNAME } from 'GLOBAL'

// 配置路由
export const createRoutes = (store) => ({
  path: CONTENTNAME == '' ? '/' : CONTENTNAME,
  component: require('COMPONENT/Core').default,

  indexRoute: {
    onEnter: (nextState, replace) => {
      replace(`${CONTENTNAME}/login`)
    }
  },

  childRoutes: [
    require('./main').default(store),
    require('./login').default(store), 
    { 
      path: `${CONTENTNAME}/redirect`, 
      component: require('VIEW/Redirect').default 
    }, { 
      path: `${CONTENTNAME}/*`, 
      component: require('VIEW/NoFound').default 
    }
  ]
  
})

export default createRoutes
