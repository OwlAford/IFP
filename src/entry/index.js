const userAgent = navigator.userAgent 
const isOpera = userAgent.indexOf('Opera') > -1
const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera
const isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE 
const isFF = userAgent.indexOf('Firefox') > -1
const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1
const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1
let IEVersion = ''

if (isIE) {  
  const reIE = new RegExp('MSIE (\\d+\\.\\d+);') 
  reIE.test(userAgent) 
  IEVersion = parseFloat(RegExp['$1'])
}

isEdge ? window.fetch = null : null

if (isIE) {
  require.ensure(['es5-shim', 'es6-shim', 'isomorphic-fetch'], require => {
    require('es5-shim')
    require('es6-shim')
    require('isomorphic-fetch')
    require('./main')
  }, 'es5&es6&fetch')
} else {
  if (!window.Promise && window.fetch) {
    require.ensure('es6-promise', require => {
      require('es6-promise').polyfill()
      require('./main')
    }, 'es6')
  } else if (window.Promise && !window.fetch) {
    require.ensure('isomorphic-fetch', require => {
      require('isomorphic-fetch')
      require('./main')
    }, 'fetch')
  } else if (!window.Promise && !window.fetch) {
    require.ensure(['es6-promise', 'isomorphic-fetch'], require => {
      require('es6-promise').polyfill()
      require('isomorphic-fetch')
      require('./main')
    }, 'es6&fetch')
  } else {
    require('./main')
  }
}


