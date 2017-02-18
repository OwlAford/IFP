import NProgress from 'nprogress'
import { message, notification } from 'UTIL/antd'
import { getCheckListAction } from './request/check'

const GET_CHECK_LIST = 'GET_CHECK_LIST'

export const getCheckList = selectOpt => {
  return (dispatch, getState) => {
    NProgress.start()
    dispatch(getCheckListAction(selectOpt)).then(action => {
      const dataBody = action.data.body
      dispatch({
        type: GET_CHECK_LIST,
        data: {
          checkList: dataBody.pendList,
          checkListTotalNum: dataBody.turnPageTotalNum,
          checkListSelectOpt: selectOpt
        }
      })
      NProgress.done()
    })
  } 
}

const initialState = {
  checkList: [],
  checkListTotalNum: 0,
  checkListSelectOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_CHECK_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
