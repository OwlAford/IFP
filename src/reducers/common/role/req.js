import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const ROLE_QUERY_REQ = 'ROLE_QUERY_REQ'
const ROLE_QUERY_SUC = 'ROLE_QUERY_SUC'
const ROLE_QUERY_FAL = 'ROLE_QUERY_FAL'

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

