import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const GET_BRANCH_LIST_REQ = 'GET_BRANCH_LIST_REQ'
const GET_BRANCH_LIST_SUC = 'GET_BRANCH_LIST_SUC'
const GET_BRANCH_LIST_FAL = 'GET_BRANCH_LIST_FAL'

export const getBranchListAction = () => ({
  [BZ_REQUESTER]: {
    types: [GET_BRANCH_LIST_REQ, GET_BRANCH_LIST_SUC, GET_BRANCH_LIST_FAL],
    url: API.GET_BRANCH_LIST_URL,
    body: {
      queryType: '1'
    }
  }
})  
