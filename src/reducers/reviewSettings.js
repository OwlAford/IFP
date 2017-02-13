import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getBsnListAction, getStrategyAction, getStrategyListAction, setRelationAction } from './request/strategy'

const GET_BSN_LIST = 'GET_BSN_LIST'
const SET_STRATEGY = 'SET_STRATEGY'
const SET_STRATEGY_LIST = 'SET_STRATEGY_LIST'


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

export const getStrategy = (authId, success, fail) => {
  return (dispatch, getState) => {
    dispatch(getStrategyAction(authId)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        const authDefine = dataBody.authDefine
        const authDefArr = authDefine.split('')
        dispatch({
          type: SET_STRATEGY,
          data: {
            alias: dataBody.alias,
            authId: dataBody.authId,
            authType: dataBody.authType,
            areaNo: dataBody.areaNo,
            authDefine: authDefine,
            add1: authDefArr[0],
            add2: authDefArr[1],
            add3: authDefArr[2],
            add4: authDefArr[3],
            add5: authDefArr[4]
          }
        })
        if (success) success()
      } else {
        message.error('数据获取失败！')
        if (fail) fail()
      }
    })
  } 
}

export const getStrategyList = selOpt => {
  return (dispatch, getState) => {
    dispatch(getStrategyListAction(selOpt)).then(action => {
      const dataBody = action.data.body
      const authDefList = dataBody.authDefList
      let strategyList = []
      authDefList.map(item => {
        let tmp = {}
        const def = item.authDefine.split('')
        Object.assign(tmp, item, {
          add1: def[0],
          add2: def[1],
          add3: def[2],
          add4: def[3],
          add5: def[4]
        })
        strategyList.push(tmp)
      })
      dispatch({
        type: SET_STRATEGY_LIST,
        data: {
          strategyList,
          strategyListTotalNum: dataBody.turnPageTotalNum,
          strategyListSelOpt: selOpt
        }
      })
    })
  } 
}

export const setRelation = params => {
  return (dispatch, getState) => {
    dispatch(setRelationAction(params)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        dispatch(getBsnList(getState().reviewSettings.bsnSelectOpt))
        notification.success({
          message: '成功',
          description: '关联成功！'
        })
      } else {
        notification.warning({
          message: '失败',
          description: '关联失败！'
        })
      }
    })
  } 
}

const initialState = {
  pageName: 'ReviewSettings',
  bsnList: [],
  bsnListTotalNum: 0,
  bsnSelectOpt: {},
  strategyDetail: {},
  strategyList: [],
  strategyListTotalNum: 0,
  strategyListSelOpt: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_BSN_LIST:
      return {
        ...state,
        ...action.data
      }

    case SET_STRATEGY:
      return {
        ...state,
        strategyDetail: action.data
      }

    case SET_STRATEGY_LIST:
      return {
        ...state,
        ...action.data
      }

    default:
      return state
  }
}
