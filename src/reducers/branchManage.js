import NProgress from 'nprogress'
import { initBranchList, applySelect } from './common/branchTree'
import { getBranchAction, modifyBranchAction, deleteBranchAction, addBranchAction } from './request/branch'
import { message } from 'antd'

const RESET_FORM = 'RESET_FORM'
const EMPTY_BRANCH = 'EMPTY_BRANCH'
const APPLY_BRANCH = 'APPLY_BRANCH'
const MODIFY_BRANCH = 'MODIFY_BRANCH'
const DELETE_BRANCH = 'DELETE_BRANCH'
const BRANCH_AFTER_TYPE = 'BRANCH_AFTER_TYPE'
const SET_ADD_BRANCH_VISIBLE = 'SET_ADD_BRANCH_VISIBLE'

export const resetForm = () => ({
  type: RESET_FORM
})

export const applyBranch = branchList => ({
  type: APPLY_BRANCH,
  data: branchList ? branchList : ''      
})

// 标识 删除
export const changeBranchDelete = () => ({
  type: DELETE_BRANCH,
  DELETE_BRANCH
})

// 标识 修改
export const changeBranchModify = () => ({
  type: MODIFY_BRANCH,
  MODIFY_BRANCH
})

// 标识 清空
export const changeBranchEmpty = () => ({
  type: EMPTY_BRANCH,
  EMPTY_BRANCH
})

// 标识 操作结果 -- 默认0 修改成功1 修改失败2 删除成功3 删除失败4 增加成功5 增加失败6 
export const changeBranchAfterType = afterType => ({
  type: BRANCH_AFTER_TYPE,
  afterType
})

// 设置增加分支弹框显示隐藏
export const setAddBranchVisible = state => ({
  type: SET_ADD_BRANCH_VISIBLE,
  visible: state
})

// 树选择的节点
export const changeBranchSelected = data => {
  return (dispatch, getState) => {
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

// 修改机构
export const branchModify = (params, success, fail) => {
  return (dispatch, getState) => {
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

// 删除机构
export const branchDelete = (params, success, fail) => {
  return (dispatch, getState) => {
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

// 添加机构
export const branchAdd = (params, success, fail) => {
  return (dispatch, getState) => {
    dispatch(changeBranchEmpty())
    dispatch(addBranchAction(params)).then(action => {
      if(action.data.body.errorCode == '0') {
        dispatch(initBranchList())
        dispatch(changeBranchSelected(params))   
        dispatch(changeBranchAfterType({type: '5'}))
        if (success) success()
      } else { 
        dispatch(changeBranchAfterType({type: '6'}))
        dispatch(changeBranchEmpty())
        if (fail) fail()
      }
    })
  }
}


const initialState = {
  selectedObject: {},
  afterOperateType:'0',
  addBranchBoxVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_ADD_BRANCH_VISIBLE:
      return {
        ...state,
        addBranchBoxVisible: action.visible
      }

    case RESET_FORM:
      return {
        ...state,
        selectedObject: {},
        brhId: ''
      }

    case APPLY_BRANCH:
      return {
        ...state,
        selectedObject: action.data,
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

    case BRANCH_AFTER_TYPE:
      return {
        ...state,
        afterOperateType: action.afterType.type
      } 

    default:
      return state
  }
}
