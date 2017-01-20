import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'
import { message } from 'antd'

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

export const USER_COMMON_REQ = 'USER_COMMON_REQ'
export const USER_COMMON_SUC = 'USER_COMMON_SUC'
export const USER_COMMON_FAL = 'USER_COMMON_FAL'

export const PAGE_USERS = 'PAGE_USERS'

/*** Actions ***/
export function increment() {
  return {
    type    : COUNTER_INCREMENT,
    payload : 1
  }
}

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

function userPageByBrhAction(data, showNum){
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
      message.success('查询完毕！')
    })
  }
}


/*** Reducer ***/
const initialState = {
  count: 0,
  userList: [],
  totalSize: 0,
  pageData: {
    currentPage: 1,
    turnPageShowNum: 10
  }
}

export default function userManageReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return {
        ...state,
        count: state.count + action.payload
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
          
    default:
      return state
  }
}
