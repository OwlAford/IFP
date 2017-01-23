import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import { API } from 'CONSTANT/globals'

const USER_COMMON_REQ = 'USER_COMMON_REQ'
const USER_COMMON_SUC = 'USER_COMMON_SUC'
const USER_COMMON_FAL = 'USER_COMMON_FAL'

const strFormat = (str, dft) => (str ? str : dft ? dft : '')

export const userPageByBrhAction = (data, showNum) => ({
  [BZ_REQUESTER]: {
    types: [USER_COMMON_REQ, USER_COMMON_SUC, USER_COMMON_FAL],
    url: API.USER_PAGE_BY_BRH_URL,
    body:{
      userNo: strFormat(data.userNo),
      userLevel: strFormat(data.userLevel),
      userName: strFormat(data.userName),

      beginTime: strFormat(data.beginTime),
      endTime: strFormat(data.endTime),
      brhId: strFormat(data.brhId),
      brhName: strFormat(data.brhName),

      currentPage: strFormat(data.currentPage, 1),
      turnPageShowNum: strFormat(showNum)
    }
  }
})

