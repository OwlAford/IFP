import Promise from 'promise-polyfill'

// 处理IE promise 兼容问题
if (!window.Promise) {  
  window.Promise = Promise
} 

// 处理IE startWith 兼容问题
if (typeof String.prototype.startsWith != 'function') {  
  String.prototype.startsWith = function (prefix) {  
    return this.slice(0, prefix.length) === prefix
  }  
}  
