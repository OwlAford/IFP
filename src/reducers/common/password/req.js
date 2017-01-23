import { API } from 'CONSTANT/globals'
import { BZ_REQUESTER } from 'MIDDLEWARE/requester'

const APP_PSWD_REQ = 'APP_PSWD_REQ'
const APP_PSWD_SUC = 'APP_PSWD_SUC'
const APP_PSWD_FAL = 'APP_PSWD_FAL'

export const changePasswordAction = (data) => ({
  [BZ_REQUESTER]: {
    types: [APP_PSWD_REQ, APP_PSWD_SUC, APP_PSWD_FAL],
    url: API.CHANGE_PASSWORD_URL,
    body: data
  }
})