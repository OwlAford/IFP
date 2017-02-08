import NProgress from 'nprogress'
import { message } from 'antd'
import { postListAction } from './request/post'

const SET_POST_LIST = 'SET_POST_LIST'
const RESET_PAGE_STATE = 'RESET_PAGE_STATE'
const SET_CUR_PAGE_STATE = 'SET_CUR_PAGE_STATE'
const SET_PAGE_SHOW_NUM = 'SET_PAGE_SHOW_NUM'


// 查询所有岗位
export const getPostList = () => {
  return (dispatch, getState) => {
    NProgress.start()
    let state = getState().postManage
    dispatch(postListAction(state.currentPage, state.turnPageShowNum)).then(action => {
      if (action.data.body.errorCode == '0') {
        dispatch({
          type: SET_POST_LIST,
          data: action.data.body
        })
      } else {
        message.error('获取列表失败！')
      }
      NProgress.done()
    })
  }
}

// 设置翻页状态
export const setCurPageState = current => ({
  type: SET_CUR_PAGE_STATE,
  data: current
})

// 重置页面翻页状态
export const resetPageState = () => ({
  type: RESET_PAGE_STATE
})

// 设置单页显示条数
export const setPageShowNum = num => ({
  type: SET_PAGE_SHOW_NUM,
  data: num
})


const initialState = {
  postListData: [],
  currentPage: 1,
  turnPageShowNum: 10
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_POST_LIST:
      return {
        ...state,
        postListData: action.data
      }

    case SET_CUR_PAGE_STATE:
      return {
        ...state,
        currentPage: action.data
      }

    case SET_PAGE_SHOW_NUM:
      return {
        ...state,
        turnPageShowNum: action.data
      }

    case RESET_PAGE_STATE:
      return {
        ...state,
        currentPage: 1,
        turnPageShowNum: 10
      }

    default:
      return state
  }
}
