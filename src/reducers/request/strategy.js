import { API } from 'CONSTANT/globals'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'

const REL_MEUITM = ['REL_MEUITM_REQ', 'REL_MEUITM_SUC', 'REL_MEUITM_FAL']

export const getBsnListAction = selectOpt => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_BSN_LIST_URL, 
    body: selectOpt
  }
})

export const getStrategyAction = authId => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_STRATEGY_URL, 
    body: {
      authId
    }
  }
})

export const getStrategyListAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.GET_STRATEGY_LIST_URL, 
    body: params
  }
})

export const setRelationAction = params => ({
  [BZ_REQUESTER]: {
    types: REL_MEUITM,
    url: API.SET_CONNECTION_URL, 
    body: params
  }
})