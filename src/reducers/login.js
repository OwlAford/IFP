import * as CK from 'UTIL/cookie'
import { md5 } from 'UTIL/md5'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'
import { message } from 'antd'

export const REQUEST_EXAMPLE = 'REQUEST_EXAMPLE'
export const RECEIVE_EXAMPLE = 'RECEIVE_EXAMPLE'
export const INVALIDATE_EXAMPLE = 'INVALIDATE_EXAMPLE'
export const LOGONIN = 'LOGONIN'
export const LOGONOUT = 'LOGONOUT'
export const SETSESSIONID = 'SETSESSIONID'
export const FAILED = 'FAILED'
export const APP_MGR_REQ = 'APP_MGR_REQ'
export const APP_MGR_SUC = 'APP_MGR_SUC'
export const APP_MGR_FAL = 'APP_MGR_FAL'

/*** Actions ***/
function setSessionIDAction() {
  return {
    [BZ_REQUESTER]: {
      types: [APP_MGR_REQ, APP_MGR_SUC, APP_MGR_FAL],
      url: API.SESSION_URL,
      body: ''
    }
  }
}

export function setSesionId_OP(data) {
  const checkCodeSrc = API.CHECKCODE_URL + '?nocache=' + new Date().getTime() + '&iCIFID=' + data
  return {
    type: SETSESSIONID,
    iCIFID: data,
    checkCodeSrc: checkCodeSrc
  }
}

export function setSessionID() {
  CK.delCookie('cstName')
  CK.delCookie('iCIFID')
  CK.delCookie('eCIFID')

  return (dispatch, getState) => {
    dispatch(setSessionIDAction()).then(action => {
      if (action.data.header.iCIFID) {
        CK.setCookie('iCIFID', action.data.header.iCIFID)
        dispatch(setSesionId_OP(action.data.header.iCIFID))
      }else{
        CK.setCookie('iCIFID', action.data.body.iCIFID)
        dispatch(setSesionId_OP(action.data.body.iCIFID))
      }
    })
  }
}

function loginAction(data) {
  return {
    [BZ_REQUESTER]: {
      types: [APP_MGR_REQ, APP_MGR_SUC, APP_MGR_FAL],
      url: API.LOGIN_URL,
      body: data
    }
  }
}

export function LOGONIN_OP(name) {
  return {
    type: LOGONIN,
    name
  }
}

export function LOGONIN_FAILED() {
  return {
    type: FAILED
  }
}

//验证登陆
export function validateLogin(data, callback) {
  const newData = {
    loginName: data.userName,
    loginPassword: md5(data.pswd.toString()),
    isLogin: data.isLogin,
    validateCodeText: data.vcode
  }
  return (dispatch, getState) => {
    dispatch(loginAction(newData)).then(action => {
      if (action.data.body.result == '1'){
        CK.setCookie('eCIFID', action.data.body.cstNo)
        CK.setCookie('cstName', action.data.body.cstName)
        dispatch(LOGONIN_OP(action.data.body.cstName))
        callback()
       } else {
         // if (action.data.body.errorMsg) {
         //   message.error(action.data.body.errorMsg)
         // } else {
         //   message.error('登录信息有误！')
         // }
         dispatch(LOGONIN_FAILED())
         dispatch(setSessionID())
       }
    })
  }
}


/*** Reducer ***/
const initialState = {
  isLogin: 'false',
  iCIFID: '',
  time: '',
  cstname: '',
  checkCodeSrc: ''
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGONIN:
      return {
        ...state,
        isLogin: 'true',
        cstname: action.name
      }
    case LOGONOUT:
      return {
        ...state,
        isLogin: 'false'
      }
    case FAILED:
      return {
        ...state,
        isLogin: 'FAILED',
        time:new Date().getTime()
      }
    case SETSESSIONID :
      return {
        ...state,
        iCIFID: action.iCIFID,
        checkCodeSrc: action.checkCodeSrc
      }
    default:
      return state
  }
}
