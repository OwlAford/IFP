import { getRoleByUserAction } from './request/role'
import { userPageByBrhAction, addUserAction } from './request/user'
import NProgress from 'nprogress'
import { message } from 'antd'

export const PAGE_USERS = 'PAGE_USERS'
export const SET_PREVBOX_VISIBLE = 'SET_PREVBOX_VISIBLE'
export const SET_PREVBOX_INFO = 'SET_PREVBOX_INFO'
export const SET_ADDUSER_VISIBLE = 'SET_ADDUSER_VISIBLE'

const pageUsers = data => ({
  type: PAGE_USERS,
  userList: data.userList,
  currentPage: data.currentPage,
  totalSize: data.totalSize,
  turnPageShowNum: data.turnPageShowNum
})


// 查询用户信息 搜索功能 分页功能
export const userPageByBrh = data => { 
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

export const setPreviewBoxVsisible = state => ({
  type: SET_PREVBOX_VISIBLE,
  visible: state
})

export const setAddUserBoxVsisible = state => ({
  type: SET_ADDUSER_VISIBLE,
  visible: state
})

const setPreviewInfo = info => ({
  type: SET_PREVBOX_INFO,
  data: info
})

export const getRoleByUser = (num, success, fail) => {
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

export const addUser = (params, success, fail) => {
  return (dispatch, getState) => {
    dispatch(addUserAction(params)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        let dataList = {
          brhId: params.brhId
        }
        dispatch(userPageByBrhAction(dataList, 10)).then(action => {
          const dataBody = action.data.body
          let data = {
            totalSize: dataBody.turnPageTotalNum,
            turnPageShowNum: dataBody.turnPageShowNum,
            currentPage: dataBody.currentPage,
            userList: dataBody.userList
          }
          dispatch(pageUsers(data))
        })
        message.success('用户添加成功！')
        if (success) success()
      } else {
        if (fail) fail()
      }
    })
  }
}

const initialState = {
  count: 0,
  userList: [],
  totalSize: 0,
  previewBoxVisible: false,
  addUserBoxVisible: false,
  previewInfo: {},
  pageData: {
    currentPage: 1,
    turnPageShowNum: 10
  }
}

export default (state = initialState, action) => {
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

      case SET_ADDUSER_VISIBLE:
        return {
          ...state,
          addUserBoxVisible: action.visible
        }
          
      default:
        return state
  }
}
