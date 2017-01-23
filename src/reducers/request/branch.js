import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const GET_BRANCH_LIST_REQ = 'GET_BRANCH_LIST_REQ'
const GET_BRANCH_LIST_SUC = 'GET_BRANCH_LIST_SUC'
const GET_BRANCH_LIST_FAL = 'GET_BRANCH_LIST_FAL'

const BRACH_MODIFY_REQ = 'BRACH_MODIFY_REQ'
const BRACH_MODIFY_SUC = 'BRACH_MODIFY_SUC'
const BRACH_MODIFY_FAL = 'BRACH_MODIFY_FAL'

const BRACH_DELETE_REQ = 'BRACH_DELETE_REQ'
const BRACH_DELETE_SUC = 'BRACH_DELETE_SUC'
const BRACH_DELETE_FAL = 'BRACH_DELETE_FAL'

const BRANCH_ADD_REQ = 'BRANCH_ADD_REQ'
const BRANCH_ADD_SUC = 'BRANCH_ADD_SUC'
const BRANCH_ADD_FAL = 'BRANCH_ADD_FAL'

export const getBranchListAction = () => ({
  [BZ_REQUESTER]: {
    types: [GET_BRANCH_LIST_REQ, GET_BRANCH_LIST_SUC, GET_BRANCH_LIST_FAL],
    url: API.GET_BRANCH_LIST_URL,
    body: {
      queryType: '1'
    }
  }
})

// 查询操作
export const getBranchAction = data => ({
  [BZ_REQUESTER]: {
    types: [GET_BRANCH_LIST_REQ, GET_BRANCH_LIST_SUC, GET_BRANCH_LIST_FAL],
    url: API.GET_BRANCH_URL_BYID,
    body: data
  }
})

// 修改操作
export const modifyBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: [BRACH_MODIFY_REQ, BRACH_MODIFY_SUC, BRACH_MODIFY_FAL],   
    url: API.GET_BRANCH_MODIFY,
    body: params,
    header: {type: 'K'}
  }
})

// 删除操作
export const deleteBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: [BRACH_DELETE_REQ, BRACH_DELETE_SUC, BRACH_DELETE_FAL], 
    url: API.GET_BRANCH_DELETE,
    body: {
      brhId: params.brhId
    },
    header: {type: 'K'}
  }
}) 

// 增加操作
export const addBranchAction = params => ({
  [BZ_REQUESTER]: {
    types: [BRANCH_ADD_REQ, BRANCH_ADD_SUC, BRANCH_ADD_FAL],
    url: API.GET_BRANCH_ADD,
    body: params
  }
})