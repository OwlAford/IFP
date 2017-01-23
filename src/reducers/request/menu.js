import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const AUTH_MENU_REQ = 'AUTH_MENU_REQ'
const AUTH_MENU_SUC = 'AUTH_MENU_SUC'
const AUTH_MENU_FAL = 'AUTH_MENU_FAL'

export const getMenuAction = () => ({
  [BZ_REQUESTER]: {
    types: [AUTH_MENU_REQ, AUTH_MENU_SUC, AUTH_MENU_FAL],
    url: API.AUTHRESOURCE_URL
  }
})
