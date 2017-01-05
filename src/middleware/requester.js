import 'isomorphic-fetch'
import * as CK from 'UTIL/cookie'
import { Message, Modal } from 'antd'
import utils from 'UTIL/public'
export const BZ_REQUESTER = Symbol('BZ REQUESTER')
const sessionName = 'iCIFID'

const FIXED_HEADER = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

const DEFAULT_REQ = {
  dataType:'JSON',
  method:'post',
  crossDomain: true
}

let ifShowError = false
const actionLogLength = (window.globalConfig && window.globalConfig.ACTION_LOG_LEN) ? parseInt(window.globalConfig.ACTION_LOG_LEN) : 20

/**
  url: URL,
  body: params,
  header: http header,
  method: POST,GET...,
  dataType: response data type,
  mode: cros\un-cros\same-orign,
  session: session name,
  types: action.type-[req_type,req_suc,req_fail]
*/

export default store => next => action => {
  const ifpApi = action[BZ_REQUESTER]
  if (typeof ifpApi === 'undefined') {
    return next(action)
  }
  var { url, body, header, method, dataType, mode, types, session, requestType, error, success} = ifpApi

  if (typeof url === 'function') {
    url = url(store.getState())
  }

  if (typeof url !== 'string') {
    throw new Error('Specify a string url.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const type = !requestType ? 'K' : requestType
  let finalHeader = _getRequestHeader(header, type, url)
  const finalBody = _getRequestBody(body, finalHeader)
  finalHeader = _setActionLogToHeader(store, finalHeader, url)

  let req = _getRequest(url, finalHeader, dataType, method, finalBody)

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[BZ_REQUESTER]
    return finalAction
  }

  const [reqType, successType, failType] = types
  next(actionWith({ type:reqType, url: url }))
  if (process.env.NODE_ENV !== 'production') {
    console.log("BZ_REQUESTER action url:" + url + " body:" + finalBody)
  }
  return _doRequest(req).then(
    json => {
      return _requestSuccess(next, actionWith, successType, json, success, url)
    }
  ).catch(
    json => {
      _saveSendFailActionLog(store, finalHeader)
      return _requestError(next, actionWith, failType, json, error, url)
    }
  )
}

function _getRequestHeader (header, type, url) {
  let finalHeader = {}
  const date = new Date()
  const channelDate = utils.getNowDateStr(date)
  const channelTime = utils.getNowTimeStr(date)
  const transCode = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf('.'))
  const transId = _getTransId()
  // alert("请求头的信息：" + CK.getCookie('eCIFID'))
  header = {
    type: type,
    encry: '0',
    channel: 'AT',
    transCode: transCode,
    channelFlow: transId,
    transId: transId,
    channelDate: channelDate,
    channelTime: channelTime,
    iCIFID: CK.getCookie('iCIFID') ? CK.getCookie('iCIFID') : '',
    eCIFID: CK.getCookie('eCIFID') ? CK.getCookie('eCIFID') : ''
  }

  if (header.type == 'J') {
    finalHeader = _getDefaultHeader({
      'Content-Type': 'application/json; charset=UTF-8',
      'type': 'J'
    })
  } else {
    finalHeader = _getDefaultHeader()
  }
  return Object.assign({}, finalHeader, header)
}

function _getDefaultHeader (header) {
  if (header) {
    return Object.assign({}, FIXED_HEADER, header)
  }
  return FIXED_HEADER
}

function _getRequestBody (body, header) {
  let finalBody = ''
  //const userId = !!CK.getCookie('userId') ? CK.getCookie('userId') : '1000000'
  if (!body) {
    body = {}
  }
  //body = Object.assign(body,{userId:userId})
  if (header.type == 'K') {
    finalBody = utils.objToKv(body)
  } else if (header.type == 'J') {
    finalBody = JSON.stringify({body: body, header: header})
  } else {
    throw new Error('unExcept type!')
  }
  return finalBody
}

function _requestSuccess (next, actionWith, successType, json, success, url) {
  if(success && typeof(success) == "function") {
    success(json)
  } else {
    if (json.header.iCIFID) {
      CK.setCookie('iCIFID', json.header.iCIFID)
    }else{
      CK.setCookie('iCIFID', json.body.iCIFID)
    }
    if (json.body.errorCode !=="0" && url !== window.globalConfig.ACTION_LOG_URL) {
      Modal.error({
        title: '请求失败！['+ json.body.errorCode + ']',
        content: json.body.errorMsg,
        onOk: onClose => {
          if (json.body.errorCode == 'BLEC0001') {
            window.location.href = window.globalConfig.REMOTE_URL
          }
          onClose()
        }
      })
    }
  }
  return next(actionWith({ type: successType, data: json, url: url }))
}

function _requestError (next, actionWith, failType, json, error, url) {
  if(error && typeof(error) == "function") {
    error()
  } else {
    if (!ifShowError && url !== window.globalConfig.ACTION_LOG_URL) {
      ifShowError = true
      Modal.error({
        title: '请求失败！',
        onOk: onClose => {
          ifShowError = false
          onClose()
        }
      })
    }
  }
  return next(actionWith({ type: failType, data: json }))
}

function _doRequest (request) {
  return fetch(request).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
  })
}

function _setActionLogToHeader (store, header, url) {
  if (window.globalConfig && window.globalConfig.LOG_ACTION === 'true') {
    let actionLog = store.getState().common.actionLog
    if (url === window.globalConfig.ACTION_LOG_URL && store.getState().common.sendFailActionLog.length > 0) {
      actionLog = store.getState().common.sendFailActionLog
    }
    let sendLog = []
    if (actionLog.length < actionLogLength) {
      sendLog = actionLog.slice()
      actionLog.splice(0, actionLog.length)
    } else {
      sendLog = actionLog.slice(0, actionLogLength)
      actionLog.splice(0, actionLogLength)
    }
    const sendLogStr = JSON.stringify(sendLog)
    header = Object.assign(header, {actionLog: sendLogStr})
  }
  return header
}

function _saveSendFailActionLog (store, header) {
  if (window.globalConfig && window.globalConfig.LOG_ACTION === 'true') {
    let sendFailActionLog = store.getState().common.sendFailActionLog
    sendFailActionLog.push(header.actionLog)
  }
}

function _getTransId () {
  return 'AT' + new Date().getTime()
}

function _getRequest (url, header, dataType, method, body) {
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