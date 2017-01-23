import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const CONFIG_DATA_REQ = 'CONFIG_DATA_REQ'
const CONFIG_DATA_SUC = 'CONFIG_DATA_SUC'
const CONFIG_DATA_FAL = 'CONFIG_DATA_FAL'

export const getUserConfigDataAction = data => ({
  [BZ_REQUESTER]: {
    types: [CONFIG_DATA_REQ, CONFIG_DATA_SUC, CONFIG_DATA_FAL],
    url: API.GET_CONFIG_DATA_URL,
    body: {
      paramType: data
    }
  }
}) 
