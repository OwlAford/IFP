import Promise from 'promise-polyfill'
import './EventSource'

if (!window.Promise) {  
  window.Promise = Promise
}