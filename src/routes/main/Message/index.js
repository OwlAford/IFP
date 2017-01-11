// 获取 reducer 注入方法
import { injectReducer } from 'STORE/reducers'

export default (store) => ({
  path : 'message.html',
  // 路由匹配时异步获取组件
  getComponent (nextState, cb) {
    // webpack 打包时通过 'require.ensure' 为异步加载模块创建分割点
    require.ensure([], (require) => {
      // 引入定义打包依赖模块
      const Message = require('./containers/MessageContainer').default
      // 获取 Message 模块的 reducer 并注入
      const reducer = require('REDUCER/message').default
      injectReducer(store, { key: 'message', reducer })
      // 回调里返回该组件
      cb(null, Message)

    // webpack bundle 包名
    }, 'message')
  }
})
