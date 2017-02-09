import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { postListAction, addPostListAction, modifyPostAction, delPostAction } from './request/post'

const SET_POST_LIST = 'SET_POST_LIST'


// 设置翻页状态
export const setCurPageState = current => ({
  type: SET_POST_LIST,
  data: current
})


const initialState = {
  pageName: 'ReviewSettings'
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_POST_LIST:
      return {
        ...state,
        Data: action.data
      }

    default:
      return state
  }
}
