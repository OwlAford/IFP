import Promise from 'promise-polyfill'
import './EventSource'

if (!window.Promise) {  
  window.Promise = Promise
}

// 判断是否IE的Edge浏览器，若是，覆盖MS Edge 自带 fetch 方法（此方法有缺陷，故替换）
// fetch 方法的 polyfill 会判断浏览器是否有该属性，决定是否覆盖，故将 fetch 方法覆写为 null
navigator.userAgent.indexOf('Edge') > -1 ? fetch = null : null