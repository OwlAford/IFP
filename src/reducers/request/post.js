import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const POST_QUERY_REQ = 'POST_QUERY_REQ'
const POST_QUERY_SUC = 'POST_QUERY_SUC'
const POST_QUERY_FAL = 'POST_QUERY_FAL'

export const postListAction = (currentPage, turnPageShowNum, state) => ({
  [BZ_REQUESTER]: {
    types: [POST_QUERY_REQ, POST_QUERY_SUC, POST_QUERY_FAL],
    url: API.GET_POST_ALL_LIST_URL,
    body: {
      currentPage: currentPage ? currentPage : 1,
      turnPageShowNum: turnPageShowNum ? turnPageShowNum : 10,
      state: state ? state : ''
    }
  }
})

export const addPostListAction = data => ({
  [BZ_REQUESTER]: {
    types: [POST_QUERY_REQ, POST_QUERY_SUC, POST_QUERY_FAL],
    url: API.GET_POST_LIST_URL,
    body: data
  }
})