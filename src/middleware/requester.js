import 'isomorphic-fetch'
import { REMOTE_URL } from 'GLOBAL'
import { getCookie, setCookie } from 'UTIL/cookie'
import { Modal } from 'antd'
import utils from 'UTIL/public'
export const BZ_REQUESTER = Symbol('BZ REQUESTER')

const FIXED_HEADER = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const DEFAULT_REQ = {
  dataType: 'JSON',
  method: 'post',
  crossDomain: true
}

let isError = false

export default store => next => action => {
  const ifpApi = action[BZ_REQUESTER]
  if (typeof ifpApi === 'undefined') {
    return next(action)
  }
  let { url, body, header, method, dataType, mode, types, session, requestType, error, success} = ifpApi
  console.log(body)
  if (typeof url === 'function') 
    url = url(store.getState())

  if (typeof url !== 'string')
    throw new Error('Specify a string url.')

  if (!Array.isArray(types) || types.length !== 3)
    throw new Error('Expected an array of three action types.')

  if (!types.every(type => typeof type === 'string'))
    throw new Error('Expected action types to be strings.') 

  const type = !requestType ? 'K' : requestType
  const finalHeader = getRequestHeader(header, type, url)
  const finalBody = getRequestBody(body, finalHeader)
  const req = getRequest(url, finalHeader, dataType, method, finalBody)

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[BZ_REQUESTER]
    return finalAction
  }

  const [reqType, successType, failType] = types
  next(actionWith({ type:reqType, url: url }))
  if (__DEV__) {
    console.log(`BZ_REQUESTER action url: ${url} body: ${finalBody}`)
  }
  return doRequest(req).then(json => {
    return requestSuccess(next, actionWith, successType, json, success, url)
  }).catch(json => {
    return requestError(next, actionWith, failType, json, error, url)
  })
}

const getRequestHeader = (header, type, url) => {
  const date = new Date()
  const transId = `AT${Date.now()}`

  header = {
    type: type,
    encry: '0',
    channel: 'AT',
    transCode: url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')),
    channelFlow: transId,
    transId: transId,
    channelDate: utils.getNowDateStr(date),
    channelTime: utils.getNowTimeStr(date),
    iCIFID: getCookie('iCIFID') ? getCookie('iCIFID') : '',
    eCIFID: getCookie('eCIFID') ? getCookie('eCIFID') : ''
  }

  return type == 'J' ? Object.assign({}, FIXED_HEADER, {'Content-Type': 'application/json; charset=UTF-8', 'type': 'J'}, header) : Object.assign({}, FIXED_HEADER, header)
}

const getRequestBody = (body, header) => {
  let finalBody = ''
  const type = header.type
  if (!body) {
    body = {}
  }
  if (type == 'K') {
    finalBody = utils.objToKv(body)
  } else if (type == 'J') {
    finalBody = JSON.stringify({body: body, header: header})
  } else {
    throw new Error('unExcept type!')
  }
  return finalBody
}

const requestSuccess = (next, actionWith, successType, json, success, url) => {
  if(success && typeof(success) == 'function') {
    success(json)
  } else {
    const { header, body } = json
    const { errorCode } = body
    header.iCIFID ? setCookie('iCIFID', header.iCIFID) : setCookie('iCIFID', body.iCIFID)
    if (errorCode !== '0') {
      Modal.error({
        title: `请求失败！[${errorCode}]`,
        content: body.errorMsg,
        onOk: onClose => {
          // 数据校验失败返回登录页
          if (errorCode == 'BLEC0001' || errorCode == 'SYEC0002') {
            window.location.href = REMOTE_URL
          }
          onClose()
        }
      })
    }
  }
  return next(actionWith({ type: successType, data: json, url: url }))
}

const requestError = (next, actionWith, failType, json, error, url) => {
  if(error && typeof(error) == 'function') {
    error()
  } else {
    if (!isError) {
      isError = true
      Modal.error({
        title: '请求失败！',
        onOk: onClose => {
          isError = false
          onClose()
        }
      })
    }
  }
  return next(actionWith({type: failType, data: json}))
}

const doRequest = request => {
  return fetch(request).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
  })
}

const getRequest = (url, header, dataType, method, body) => {
  let params = {
    headers: header,
    dataType: dataType ? dataType : DEFAULT_REQ.dataType,
    method: method ? method : DEFAULT_REQ.method
  }
  if (method != 'GET' && method != 'HEAD') {
    params.body = body 
  }
  if (method == 'GET') {
    url += '?' + body
  }
  return new Request(url, params)
}