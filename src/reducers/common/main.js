import { message } from 'antd'
import { getUserConfigData } from './config'
import { getRoleTree } from './role'

const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const USER_MENU_SUC = 'USER_MENU_SUC'


export const setPasswordVisible = passwordVisible => ({
  type: CHANGE_PASSWORD,
  passwordVisible: passwordVisible
})

export const refreshInfo = data => ({
  type: USER_MENU_SUC,
  data: data
})

// 查询用户等级 + 证件类型配置信息 + 角色树
export const initUserForm = () => {
  return (dispatch, getState) => {
    dispatch(getUserConfigData())
    dispatch(getRoleTree())
  }
}

const initialState = {
  currentCstIP: '',
  currentLoginTime: '',
  lastCstIP: '',
  lastLoginTime: '',
  loginCount: '',
  currentPath: window.globalConfig.HOME_PATH,
  passwordVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_PASSWORD:
      return {
        ...state,
        passwordVisible: action.passwordVisible
      }

    case USER_MENU_SUC:
      const data = action.data.body
      return {
        ...state,
        isUserMenuLoaded:true,
        currentCstIP: data.cstCurrLoginIP,
        currentLoginTime: data.cstCurrLoginTime,
        lastCstIP: data.cstLastLoginIP,
        lastLoginTime: data.cstLastLoginTime,
        loginCount: data.cstLoginTimes
      }

    default:
      return state
  }
}
