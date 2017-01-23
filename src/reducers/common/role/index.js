import utils from 'UTIL/public'
import { getRoleListAction } from './req'

const ROLE_TREE_LIST = 'ROLE_TREE_LIST'
const UPDATE_ROLE_TREE = 'UPDATE_ROLE_TREE'

const roleTreeList = list => ({
  type: ROLE_TREE_LIST,
  data: list
})

// 用户绑定角色所需要数据的类型
const getRoleField = ({roleName, roleId}) => {
  return {
    label: roleName,
    value: roleId,
    key: roleId,
    children: []
  }
}

const updateRoleTree = list => ({
  type: UPDATE_ROLE_TREE,
  data: list
})

// 查询所有角色时，树所需要的类型
const converRoleField = ({roleId, rolePId, roleName, roleDesc, roleStatus, roleType}) => {
  return {
    roleId: roleId,
    rolePId: rolePId,
    roleName: roleName,
    roleDesc: roleDesc,
    roleStatus: roleStatus,
    roleType: roleType,
    children: []
  }
}

export const getRoleTree = () => {
  return (dispatch, getState) => {
    dispatch(getRoleListAction()).then(action => {
      let dataRoleList = action.data.body.roleList
      let roleList = utils.groupList(dataRoleList, 'roleId', 'rolePId', 'children', converRoleField)
      let getRoleList = utils.groupList(dataRoleList,'roleId', 'rolePId', 'children', getRoleField)
      dispatch(roleTreeList(getRoleList))
      dispatch(updateRoleTree(roleList))
    })
  }
}

const initialState = {
  getRoleList: [],
  roleList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ROLE_TREE_LIST:
      return {
        ...state,
        getRoleList: action.data
      }

    case UPDATE_ROLE_TREE:
      return {
        ...state,
        roleList: action.data
      }

    default:
      return state
  }
}
