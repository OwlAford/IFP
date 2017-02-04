import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const ROLE_QUERY_REQ = 'ROLE_QUERY_REQ'
const ROLE_QUERY_SUC = 'ROLE_QUERY_SUC'
const ROLE_QUERY_FAL = 'ROLE_QUERY_FAL'

const USER_COMMON_REQ = 'USER_COMMON_REQ'
const USER_COMMON_SUC = 'USER_COMMON_SUC'
const USER_COMMON_FAL = 'USER_COMMON_FAL'

const ITEM_QUERY_REQ = 'ITEM_QUERY_REQ'
const ITEM_QUERY_SUC = 'ITEM_QUERY_SUC'
const ITEM_QUERY_FAL = 'ITEM_QUERY_FAL'

export const getRoleListAction = () => ({
  [BZ_REQUESTER]: {
    types: [ROLE_QUERY_REQ, ROLE_QUERY_SUC, ROLE_QUERY_FAL],
    url: API.GET_ROLE_LIST_URL,
    body: {}
  }
})

export const getRoleByUserAction = num => ({
  [BZ_REQUESTER]: {
    types: [ROLE_QUERY_REQ, ROLE_QUERY_SUC, ROLE_QUERY_FAL],
    url: API.GET_ROLE_BY_USER_URL,
    body:{
      userNo: num
    }
  }
})

export const getUserRoleListAction = userNo => ({
  [BZ_REQUESTER]: {
    types: [ROLE_QUERY_REQ, ROLE_QUERY_SUC, ROLE_QUERY_FAL],
    url: API.USER_BIND_ROLE_URL,
    body: {
      userNo: userNo
    }
  }
})

export const userRoleAssociationAction = (userNo, userName, roleList) => ({
  [BZ_REQUESTER]: {
    types: [USER_COMMON_REQ, USER_COMMON_SUC, USER_COMMON_FAL],
    url: API.CONNET_USER_AND_ROLE_URL,
    body: {
      userNo: userNo,
      name: userName,
      roleList: roleList ? roleList : []
    }
  }
})

export const getAllRoleFnItemsAction = (curPage, roleId, roleName, state, pageSize) => ({
  [BZ_REQUESTER]: {
    types: [ITEM_QUERY_REQ, ITEM_QUERY_SUC, ITEM_QUERY_FAL],
    url: API.GET_ALL_ITEM_PAGE_URL,
    body: {
      currentPage: curPage,
      turnPageShowNum: pageSize,
      roleId: roleId ? roleId : '',
      roleName: roleName ? roleName : '',
      state: state ? state : ''
    }
  }
})

export const getInfoByRoleIdAction = roleId => ({
  [BZ_REQUESTER]: {
    types: [ROLE_QUERY_REQ, ROLE_QUERY_SUC, ROLE_QUERY_FAL],
    url: API.GET_ITEM_BY_ROLE_URL,
    body: {
      roleId: roleId
    }
  }
})

export const getInfoByRoleNameAction = roleName => ({
  [BZ_REQUESTER]: {
    types: [ROLE_QUERY_REQ, ROLE_QUERY_SUC, ROLE_QUERY_FAL],
    url: API.GET_ITEM_BY_ROLE_URL,
    body: {
      roleName: roleName ? roleName : ''
    }
  }
})

