import Promise from 'promise-polyfill'
import './EventSource'

if (!window.Promise) {  
  window.Promise = Promise
}

//判断是否IE的Edge浏览器
const isEdge = navigator.userAgent.indexOf("Edge") > -1
isEdge ? fetch = null : null