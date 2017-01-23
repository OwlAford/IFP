import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import NProgress from 'nprogress'
import { API } from 'CONSTANT/globals'
import utils from 'UTIL/public'
import { initBranchList, applySelect } from './common/branch'
import { message } from 'antd'

const AUTH_MENU_REQ = 'AUTH_MENU_REQ'
const AUTH_MENU_SUC = 'AUTH_MENU_SUC'
const AUTH_MENU_FAL = 'AUTH_MENU_FAL'

// 删除
const DELETE_BRANCH = 'DELETE_BRANCH'

// 修改
const MODIFY_BRANCH = 'MODIFY_BRANCH'

// 清空
const EMPTY_BRANCH = 'EMPTY_BRANCH'

// 删除
const DELETE_BRANCH_IFP = 'DELETE_BRANCH_IFP'

// 修改
const MODIFY_BRANCH_IFP = 'MODIFY_BRANCH_IFP'

// 操作后的状态
const BRANCH_AFTER_TYPE = 'BRANCH_AFTER_TYPE'

// 增加操作
const BRANCH_ADD_REQ = 'BRANCH_ADD_REQ'
const BRANCH_ADD_SUC = 'BRANCH_ADD_SUC'
const BRANCH_ADD_FAL = 'BRANCH_ADD_FAL'

// 修改操作
const BRACH_MODIFY_REQ = 'BRACH_MODIFY_REQ'
const BRACH_MODIFY_SUC = 'BRACH_MODIFY_SUC'
const BRACH_MODIFY_FAL = 'BRACH_MODIFY_FAL'

// 删除操作
const BRACH_DELETE_REQ = 'BRACH_DELETE_REQ'
const BRACH_DELETE_SUC = 'BRACH_DELETE_SUC'
const BRACH_DELETE_FAL = 'BRACH_DELETE_FAL'

const GET_BRANCH_LIST_REQ = 'GET_BRANCH_LIST_REQ'
const GET_BRANCH_LIST_SUC = 'GET_BRANCH_LIST_SUC'
const GET_BRANCH_LIST_FAL = 'GET_BRANCH_LIST_FAL'

const APPLY_BRANCH = 'APPLY_BRANCH'
const RESET_FORM = 'RESET_FORM'
const CLEAN_BRH_FORM = 'CLEAN_BRH_FORM'

const CONTROL_DELETE = 'CONTROL_DELETE'
const CLEAN_CONTROL_DELETE = 'CLEAN_CONTROL_DELETE'
const CLEAN_CONTROL_MODIDFY = 'CLEAN_CONTROL_MODIDFY'

const SET_ADD_BRANCH_VISIBLE = 'SET_ADD_BRANCH_VISIBLE'

export function resetForm() {
  return {
    type: RESET_FORM,
    data: ''
  } 
}

// 查询所有机构
// 拿指定branchId
function getBranchAction(data) {
  return {
    [BZ_REQUESTER]: {
      types: [GET_BRANCH_LIST_REQ, GET_BRANCH_LIST_SUC, GET_BRANCH_LIST_FAL],
      url: API.GET_BRANCH_URL_BYID,
      body: data
    }
  }
}

function applyBranch(branchList) {
  return {
    type: APPLY_BRANCH,
    data: branchList ? branchList : ''      
  }
}

// 标识 修改操作
export function changeBranchModify() {
  return {
    type: MODIFY_BRANCH,
    MODIFY_BRANCH
  } 
}

// 树选择的节点
export function changeBranchSelected(data) {
  return (dispatch, state) => {
    if (data.brhId != null || data.brhId != undefined) {
        NProgress.start()
        dispatch(getBranchAction(data)).then(action => {
        let brhParentId = action.data.body.brhParentId
        dispatch(applySelect(brhParentId))
        dispatch(applyBranch(action.data.body))
        NProgress.done()
        message.success("加载完毕！")
      })
    } else {
      message.warning("当前未选中机构！")
      dispatch(applySelect(''))
      dispatch(applyBranch())
    }
  }
}

// 修改操作
function modifyBranchAction(params) {
  return {
    [BZ_REQUESTER]: {
      types: [BRACH_MODIFY_REQ, BRACH_MODIFY_SUC, BRACH_MODIFY_FAL],   
      url: API.GET_BRANCH_MODIFY,
      body: params,
      header: {type: 'K'}
    }
  }
}

// 删除操作
function deleteBranchAction(params) {
  return {
    [BZ_REQUESTER]: {
      types: [BRACH_DELETE_REQ, BRACH_DELETE_SUC, BRACH_DELETE_FAL], 
      url: API.GET_BRANCH_DELETE,
      body: {
        brhId: params.brhId
      },
      header: {type: 'K'}
    }
  }
}

// 增加操作
function addBranchAction(params) {
  return {
    [BZ_REQUESTER]: {
      types: [BRANCH_ADD_REQ, BRANCH_ADD_SUC, BRANCH_ADD_FAL],
      url: API.GET_BRANCH_ADD,
      body: params
    }
  }
}

// 标识 清空
export function changeBranchEmpty() {
  return {
    type: EMPTY_BRANCH,
    EMPTY_BRANCH
  } 
}

// 标识 操作结果 -- 默认0 修改成功1 修改失败2 删除成功3 删除失败4 增加成功5 增加失败6 
export function changeBranchAfterType(afterType) {
  return {
    type: BRANCH_AFTER_TYPE,
    afterType
  } 
}

// 后台 修改机构
export function branchModify(params, success, fail) {
  return (dispatch,state) => {
    dispatch(changeBranchEmpty())
    dispatch(modifyBranchAction(params)).then(action => {
      if (action.data.body.errorCode=='0') {
        dispatch(initBranchList())      
        dispatch(changeBranchAfterType({type: '1'}))
      } else {   
        dispatch(changeBranchAfterType({type: '2'}))
      }
      if (success) success()
    }, () => {
      if (fail) fail()
      dispatch(changeBranchEmpty())
    })   
  }
}

// 标识 删除操作 
export function changeBranchDelete() {
  return {
    type: DELETE_BRANCH,
    DELETE_BRANCH
  } 
}

// 后台 删除机构
export function branchDelete(params, success, fail) {
  return (dispatch, state) => {
    dispatch(changeBranchEmpty())
    dispatch(deleteBranchAction(params)).then( action => {
      if (action.data.body.errorCode == '0' && action.data.body.op_result != '0') {     
        dispatch(changeBranchAfterType({type: '3'}))
        dispatch(initBranchList())
      } else { 
        dispatch(changeBranchAfterType({type: '4'}))
      }
      if (success) success()
    }, () => {
      if (fail) fail()
      dispatch(changeBranchEmpty())
    })  
  }
}

// 后台 添加机构
export function branchAdd(params, success, fail) {
  return (dispatch, getState) => {
    dispatch(changeBranchEmpty())
    dispatch(addBranchAction(params)).then(action => {
      if(action.data.body.errorCode == '0') {
        dispatch(initBranchList())   
        dispatch(changeBranchAfterType({type: '5'}))
        if (success) success()
      }
      else{ 
        dispatch(changeBranchAfterType({type: '6'}))
        dispatch(changeBranchEmpty())
        if (fail) fail()
      }
    })
  }
}

// 设置增加分支弹框显示隐藏
export function setAddBranchVisible(state) {
  return {
    type: SET_ADD_BRANCH_VISIBLE,
    visible: state
  }
}

/*** Reducer ***/
const initialState = {
  selectedObject: {},
  afterOperateType:'0',
  addBranchBoxVisible: false
}
export default function branchManageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADD_BRANCH_VISIBLE:
      return {
        ...state,
        addBranchBoxVisible: action.visible
      }

    case RESET_FORM:
      return {
        ...state,
        selectedObject: {}
      }

    case APPLY_BRANCH:
      return {
        ...state,
        selectedObject: action.data, //左边机构列表选择时的那条数据
        brhId: action.data.brhId
      } 

    case MODIFY_BRANCH:
      return {
        ...state,
        selectedOperate: action.MODIFY_BRANCH
      }

    case DELETE_BRANCH:
      return {
        ...state,
        selectedOperate: action.DELETE_BRANCH
      }

    case EMPTY_BRANCH:
      return {
        ...state,
        selectedOperate: ''
      }

    // 操作完后状态
    case BRANCH_AFTER_TYPE:
      return {
        ...state,
        afterOperateType: action.afterType.type
      } 

    default:
      return state
  }
}
