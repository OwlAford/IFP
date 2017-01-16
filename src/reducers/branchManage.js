import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import utils from 'UTIL/public'
import { API } from 'CONSTANT/globals'
import { message } from 'antd'
import { sendData } from './main'
// import { initBranchList } from './userMgr'

const AUTH_MENU_REQ = 'AUTH_MENU_REQ'
const AUTH_MENU_SUC = 'AUTH_MENU_SUC'
const AUTH_MENU_FAL = 'AUTH_MENU_FAL'

//删除
const DELETE_BRANCH = 'DELETE_BRANCH'

//修改
const MODIFY_BRANCH = 'MODIFY_BRANCH'

//清空
const EMPTY_BRANCH = 'EMPTY_BRANCH'

//删除
const DELETE_BRANCH_IFP = 'DELETE_BRANCH_IFP'

//修改
const MODIFY_BRANCH_IFP = 'MODIFY_BRANCH_IFP'

//操作后的状态
const BRANCH_AFTER_TYPE = 'BRANCH_AFTER_TYPE'

//增加操作
const BRANCH_ADD_REQ = 'BRANCH_ADD_REQ'
const BRANCH_ADD_SUC = 'BRANCH_ADD_SUC'
const BRANCH_ADD_FAL = 'BRANCH_ADD_FAL'

//修改操作
const BRACH_MODIFY_REQ = 'BRACH_MODIFY_REQ'
const BRACH_MODIFY_SUC = 'BRACH_MODIFY_SUC'
const BRACH_MODIFY_FAL = 'BRACH_MODIFY_FAL'

//删除操作
const BRACH_DELETE_REQ = 'BRACH_DELETE_REQ'
const BRACH_DELETE_SUC = 'BRACH_DELETE_SUC'
const BRACH_DELETE_FAL = 'BRACH_DELETE_FAL'

const GET_BRANCH_LIST_REQ = 'GET_BRANCH_LIST_REQ'
const GET_BRANCH_LIST_SUC = 'GET_BRANCH_LIST_SUC'
const GET_BRANCH_LIST_FAL = 'GET_BRANCH_LIST_FAL'

const BING_GROUP_BRANCH = 'BING_GROUP_BRANCH'
const RESET_FORM = 'RESET_FORM'
const CLEAN_BRH_FORM = 'CLEAN_BRH_FORM'

const CONTROL_DELETE = 'CONTROL_DELETE'
const CLEAN_CONTROL_DELETE = 'CLEAN_CONTROL_DELETE'
const CLEAN_CONTROL_MODIDFY = 'CLEAN_CONTROL_MODIDFY'
const CONTROL_MODIDFY = 'CONTROL_MODIDFY'

//查询所有机构
//拿指定branchId
function getBranchAction(data) {
  return {
    [BZ_REQUESTER]: {
      types: [GET_BRANCH_LIST_REQ, GET_BRANCH_LIST_SUC, GET_BRANCH_LIST_FAL],
      url: API.GET_BRANCH_URL_BYID,
      body: data
    }
  }
}

function bingBranchMsg(branchList) {
  return {
    type: BING_GROUP_BRANCH,
    data: branchList ? branchList : ''      
  }
}

function ContrclickDelete() {
  return {
    type: CONTROL_DELETE
  } 
}

function ContrclickModify() {
  return {
    type: CONTROL_MODIDFY
  } 
}

//树选择的节点
export function changeBranchSelected(data) {
  return (dispatch, state) => {
    if (data.brhId != null || data.brhId != undefined) {
        dispatch(getBranchAction(data)).then(action => {
        let brhParentId = action.data.body.brhParentId
        dispatch(sendData(brhParentId))
        dispatch(bingBranchMsg(action.data.body))
        dispatch(ContrclickDelete())   //控制删除按钮
        dispatch(ContrclickModify())   //控制修改的
      })
    } else {
      message.info("当前未选中机构")
      let brhParentId = ""
      dispatch(sendData(brhParentId))
      dispatch(bingBranchMsg())
      dispatch(ContrclickDelete())    //控制删除按钮
      dispatch(ContrclickModify())
    }
  }
}

/*** Reducer ***/
const initialState = {
  count: 0,
  time: 0,
  selectedObject: {},
  deleteVisible: false,
  modifyVisible: false,
}
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case BING_GROUP_BRANCH:
      return {
        ...state,
        selectedObject: action.data, //左边机构列表选择时的那条数据
        brhId: action.data.brhId
      } 

    case CONTROL_DELETE:
      return {
        ...state,
        deleteVisible: true
      }

    case CONTROL_MODIDFY:
      return {
        ...state,
        modifyVisible: true
      }

    case CLEAN_CONTROL_MODIDFY:
      return {
        ...state,
        modifyVisible: false
      }

    default:
      return state
  }
}
