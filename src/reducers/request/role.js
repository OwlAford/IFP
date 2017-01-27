import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const ROLE_QUERY_REQ = 'ROLE_QUERY_REQ'
const ROLE_QUERY_SUC = 'ROLE_QUERY_SUC'
const ROLE_QUERY_FAL = 'ROLE_QUERY_FAL'

const USER_COMMON_REQ = 'USER_COMMON_REQ'
const USER_COMMON_SUC = 'USER_COMMON_SUC'
const USER_COMMON_FAL = 'USER_COMMON_FAL'

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

