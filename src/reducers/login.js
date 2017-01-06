import * as CK from 'UTIL/cookie'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

export const LOGIN_TRIPLE = 'LOGIN_TRIPLE'
export const SETSESSIONID = 'SETSESSIONID'
export const APP_MGR_REQ = 'APP_MGR_REQ'
export const APP_MGR_SUC = 'APP_MGR_SUC'
export const APP_MGR_FAL = 'APP_MGR_FAL'

/*** Actions ***/
export function triple(value) {
  return {
    type    : LOGIN_TRIPLE,
    payload : value
  }
}

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


/*** Reducer ***/
const initialState = {
  count: 2,
  isLogin: 'false',
  iCIFID: '',
  time: '',
  cstname: '',
  checkCodeSrc: ''
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_TRIPLE :
      return {
        ...state,
        count: state.count * 3 
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
