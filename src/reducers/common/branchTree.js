import NProgress from 'nprogress'
import utils from 'UTIL/public'
import { getBranchListAction } from '../request/branch'

const GET_BRANCH_LIST = 'GET_BRANCH_LIST'
const USER_GROUP_BRANCH = 'USER_GROUP_BRANCH'
const CLEAN_BRANCH = 'CLEAN_BRANCH'
const UPDATE_BRANACH = 'UPDATE_BRANACH'
const APPLY_BRANCH_SELECT = 'APPLY_BRANCH_SELECT'

export const cleanBranch = () => ({
  type: CLEAN_BRANCH
})

export const updateBranch = selectBranchId => ({
  type: UPDATE_BRANACH,
  selectBranchId: selectBranchId ? selectBranchId : ''
})

const getBranch = branch => ({
  label: branch.brhName,
  value: branch.brhId,
  key: branch.brhId,
  children: []
})

export const applySelect = data => ({
  type: APPLY_BRANCH_SELECT,
  data
})

const groupGetBranch = getBranchList => ({
  type: GET_BRANCH_LIST,
  data: getBranchList
})

const groupBranch = (branchList, userGetBranchList) => ({
  type: USER_GROUP_BRANCH,
  branchList: branchList,
  userGetBranchList: userGetBranchList
})

const converRoleField = branch => ({
  id: branch.brhId,
  parentId: branch.brhParentId,
  name: branch.brhName,
  children: []
})

export const initBranchList = (cb) => {
  return (dispatch,state) => {
    NProgress.start()
    dispatch(getBranchListAction()).then(action => {
      let branchList = action.data.body.branchList
      let userGetBranchList = utils.groupList(branchList, 'brhId', 'brhParentId', 'children', converRoleField)
    
      let getBranchList = utils.groupList(branchList, 'brhId', 'brhParentId', 'children', getBranch)
      dispatch(groupGetBranch(getBranchList)) //新增的时候查机构列表
      dispatch(groupBranch(branchList, userGetBranchList))
      NProgress.done()
      if (cb) cb()
    })
  }
}

const initialState = {
  selectBranchId: '',
  branchList: [],
  getBranchList: [],
  userGetBranchList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case CLEAN_BRANCH:
      return {
        ...state,
        selectBranchId: ''
      }

    case UPDATE_BRANACH:
      return {
        ...state,
        selectBranchId: action.selectBranchId
      }

    case APPLY_BRANCH_SELECT:
      return {
        ...state,
        selectBranchId: action.data
      }
        
    case GET_BRANCH_LIST:
      return {
        ...state,
        getBranchList: action.data
      }

    case USER_GROUP_BRANCH:
      return {
        ...state,
        branchList: action.branchList,
        userGetBranchList: action.userGetBranchList
      }

    default:
      return state
  }
}
