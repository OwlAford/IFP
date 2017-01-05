import {BZ_REQUESTER} from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'
import * as actions from 'CONSTANT/types/home'

// Actions =============================================================

export function setuid (value) {
  return {
    type    : 'SET_UID',
    payload : value
  }
}

export function setRegData (data, cb) {
  return (dispatch) => {
    dispatch(setRegDataAction(data))
    cb && cb()
  }
}

export function setRegDataAction (data) {
  return {
    type : 'SET_REG_DATA',
    payload : data
  }
}

export function setname (value) {
  return {
    type    : 'SET_NAME',
    payload : value
  }
}

export const getuidAsync = (cb) => {
  return (dispatch, getState) => {
    dispatch(getuidAction()).then(action => {
        action.type != 'AUTH_MENU_FAL' && dispatch(setuid(action.data.body.uid))
        cb && cb(action.type == 'AUTH_MENU_FAL', action.data.body)
    })
  }
}

const getuidAction = () => {
  return {
    [BZ_REQUESTER] : {
      types: [actions.AUTH_MENU_REQ, actions.AUTH_MENU_SUC, actions.AUTH_MENU_FAL],
      url: API.AUTHRESOURCE_URL
    }
  }
}

// Reducer =============================================================

const initialState = {
  uid: '',
  mine: '',
  regData: null
}
export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_UID' :
      return {
        ...state,
        uid: action.payload
      }
    case 'SET_NAME' :
      return {
        ...state,
        mine: action.payload
      }
    case 'SET_REG_DATA' :
      return {
        ...state,
        regData: action.payload
      }
    default:
      return state
  }
}
