import utils from 'UTIL/public'
import { getUserRoleListAction, userRoleAssociationAction } from '../request/role'
import { notification } from 'antd'

const USER_GET_ROLE = 'USER_GET_ROLE'
const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE'

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
      dispatch(updateRoleTree(selectKeys))
      let RoleRelList = action.data.body.userRoleRelList
      let userGetRoleList = utils.groupList(RoleRelList, 'roleId', 'rolePId', 'children', getRoleField)
      dispatch(getRoleTreeField(userGetRoleList, RoleRelList))
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

export const updateRoleTree = userRoleRelList => ({
  type: UPDATE_USER_ROLE,
  data: userRoleRelList
})

const initialState = {
  userGetRoleList: [],
  roleRelList: [],
  updateUserRoleList: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case USER_GET_ROLE:
      return {
        ...state,
        userGetRoleList: action.userGetRoleList,
        roleRelList: action.roleRelList
      }

    case UPDATE_USER_ROLE:
      return {
        ...state,
        updateUserRoleList: action.data
      }

    default:
      return state
  }
}
