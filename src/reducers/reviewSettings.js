import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getBsnListAction } from './request/strategy'

const GET_BSN_LIST = 'GET_BSN_LIST'


export const getBsnList = selectOpt => {
  return (dispatch, getState) => {
    NProgress.start()
    dispatch(getBsnListAction(selectOpt)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        dispatch({
          type: GET_BSN_LIST,
          data: {
            bsnList: dataBody.bsnList,
            bsnListTotalNum: dataBody.turnPageTotalNum,
            bsnSelectOpt: selectOpt
          }
        })
        message.success("加载完毕！")
      } else {
        message.error('获取列表失败！')
      }
      NProgress.done()
    })
  } 
}


const initialState = {
  pageName: 'ReviewSettings',
  bsnList: [],
  bsnListTotalNum: 0,
  bsnSelectOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_BSN_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
