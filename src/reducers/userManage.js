import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import NProgress from 'nprogress'
import { getRoleByUserAction } from './main'
import { API } from 'CONSTANT/globals'
import { message } from 'antd'

export const USER_COMMON_REQ = 'USER_COMMON_REQ'
export const USER_COMMON_SUC = 'USER_COMMON_SUC'
export const USER_COMMON_FAL = 'USER_COMMON_FAL'

export const PAGE_USERS = 'PAGE_USERS'

export const SET_PREVBOX_VISIBLE = 'SET_PREVBOX_VISIBLE'
export const SET_PREVBOX_INFO = 'SET_PREVBOX_INFO'

/*** Actions ***/
function strFormat(str, dft) {
  let cmp = ''
  if (dft)
    cmp = dft
  return str ? str : cmp
}

function pageUsers(data) {
  return {
    type: PAGE_USERS,
    userList: data.userList,
    currentPage: data.currentPage,
    totalSize: data.totalSize,
    turnPageShowNum: data.turnPageShowNum
  }
}

function userPageByBrhAction(data, showNum) {
  return {
    [BZ_REQUESTER]: {
      types: [USER_COMMON_REQ, USER_COMMON_SUC, USER_COMMON_FAL],
      url: API.USER_PAGE_BY_BRH_URL,

      body:{
        userNo: strFormat(data.userNo),
        userLevel: strFormat(data.userLevel),
        userName: strFormat(data.userName),

        beginTime: strFormat(data.beginTime),
        endTime: strFormat(data.endTime),
        brhId: strFormat(data.brhId),
        brhName: strFormat(data.brhName),

        currentPage: strFormat(data.currentPage, 1),
        turnPageShowNum: strFormat(showNum)
      }
    }
  }
}

// 查询用户信息 搜索功能 分页功能
export function userPageByBrh(data) { 
  return (dispatch, getState) => {
    NProgress.start()
    dispatch(userPageByBrhAction(data, getState().userManage.pageData.turnPageShowNum))
    .then(action => {
      let dataBody = action.data.body
      let userList = dataBody.userList.map(user => Object.assign(user, {
        key: user.userNo
      }))
      let data = Object.assign({
      }, {
        userList: userList
      }, {
        totalSize: dataBody.turnPageTotalNum
      }, {
        turnPageShowNum: dataBody.turnPageShowNum
      }, {
        currentPage: dataBody.currentPage
      })
      dispatch(pageUsers(data))
      NProgress.done()
      message.success('加载完毕！')
    })
  }
}

export function setPreviewBoxVsisible(state) {
  return {
    type: SET_PREVBOX_VISIBLE,
    visible: state
  }
}

function setPreviewInfo(info) {
  return {
    type: SET_PREVBOX_INFO,
    data: info
  }
}

export function getRoleByUser(num, success, fail) {
  return (dispatch, getState) => {
    dispatch(setPreviewInfo({}))
    dispatch(getRoleByUserAction(num)).then(action => { 
      dispatch(setPreviewInfo(action.data.body))
      if (success) success()
    }, () => {
      message.warning("获取失败！")
      if (fail) fail()
    })
  }
}


/*** Reducer ***/
const initialState = {
  count: 0,
  userList: [],
  totalSize: 0,
  previewBoxVisible: false,
  previewInfo: {},
  pageData: {
    currentPage: 1,
    turnPageShowNum: 10
  }
}

export default function userManageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PREVBOX_INFO:
      return {
        ...state,
        previewInfo: action.data
      }

    case PAGE_USERS:
      return { 
        ...state,
        userList: action.userList,
        totalSize: action.totalSize,
        pageData: {
          currentPage: action.currentPage,
          turnPageShowNum: action.turnPageShowNum
        }
      }

      case SET_PREVBOX_VISIBLE:
        return {
          ...state,
          previewBoxVisible: action.visible
        }
          
      default:
        return state
  }
}
