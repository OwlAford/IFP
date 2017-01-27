import utils from 'UTIL/public'
import { getUserRoleListAction, userRoleAssociationAction, getRoleListAction } from '../request/role'
import { notification } from 'antd'

const USER_GET_ROLE = 'USER_GET_ROLE'
const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE'
const ROLE_TREE_LIST = 'ROLE_TREE_LIST'
const UPDATE_ROLE_TREE = 'UPDATE_ROLE_TREE'

const getRoleTreeField = (userGetRoleList, roleRelList) => ({
  type: USER_GET_ROLE,
  userGetRoleList,
  roleRelList
})

// 用户绑定角色所需要数据的类型
const getRoleField = roleList => ({
  label: roleList.roleName,
  value: roleList.roleId,
  key: roleList.roleId,
  children: [] 
})

// 查询所有角色时，树所需要的类型
const converRoleField = role => ({
  roleId: role.roleId,
  rolePId: role.rolePId,
  roleName: role.roleName,
  roleDesc: role.roleDesc,
  roleStatus: role.roleStatus,
  roleType: role.roleType,
  children: []
})

// 查询用户与角色关联的
// export const initGetRoleTree = userNo => {
//   return (dispatch,getState) => {
//     dispatch(getUserRoleTree(userNo)) 
//   }
// }

export const getUserRoleTree = userNo => {
  return (dispatch, getState) => {
    dispatch(getUserRoleListAction(userNo)).then(action => {
      let selectKeys = []
      let userRoleRelList = action.data.body.userRoleRelList
      userRoleRelList.map(item => {
        item.state == '1' ? selectKeys.push(item.roleId) : null
      })
      dispatch(updateSelectedRole(selectKeys))
      let roleRelList = action.data.body.userRoleRelList
      let userGetRoleList = utils.groupList(roleRelList, 'roleId', 'rolePId', 'children', getRoleField)
      dispatch(getRoleTreeField(userGetRoleList, roleRelList))
    })
  }
}

// 绑定角色的方法
export const userRoleAssociation = (userNo, userName, roleList) => {
    return (dispatch, getState) => {
    dispatch(userRoleAssociationAction(userNo, userName, roleList)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        notification.success({
          message: '成功',
          description: '綁定成功！'
        })
      } else {
        notification.warning({
          message: '失败',
          description: `绑定失败，errCode:${dataBody.errorCode}，errMsg:${dataBody.errorMsg}`
        })
      }
    })
  }
}

const updateRoleTree = roleList => ({
  type: UPDATE_ROLE_TREE,
  data: roleList
})

export const getRoleTree = () => {
  return (dispatch, getState) => {
    dispatch(getRoleListAction()).then(action => {
      const dataBody = action.data.body
      let roleList = utils.groupList(dataBody.roleList, 'roleId', 'rolePId', 'children', converRoleField)
      let getRoleList = utils.groupList(dataBody.roleList, 'roleId', 'rolePId', 'children', getRoleField)
      dispatch(roleTreeList(getRoleList))
      dispatch(updateRoleTree(roleList))
    })
  }
}

const roleTreeList = getRoleList => ({
  type: ROLE_TREE_LIST,
  data: getRoleList
})


export const updateSelectedRole = selectedRoleList => ({
  type: UPDATE_USER_ROLE,
  data: selectedRoleList
})

const initialState = {
  roleList: [],
  userGetRoleList: [],
  getRoleList: [],
  roleRelList: [],
  selectedRoleList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case USER_GET_ROLE:
      return {
        ...state,
        userGetRoleList: action.userGetRoleList,
        roleRelList: action.roleRelList
      }

    case UPDATE_ROLE_TREE:
      return {
        ...state,
        roleList: action.data
      }

    case UPDATE_USER_ROLE:
      return {
        ...state,
        selectedRoleList: action.data
      }

    case ROLE_TREE_LIST:
      return {
        ...state,
        getRoleList: action.data
      }

    default:
      return state
  }
}
