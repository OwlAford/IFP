import utils from 'UTIL/public'
import { getUserConfigDataAction } from './req'

const SET_USER_TYPE_LEVEL = 'SET_USER_TYPE_LEVEL'

const setUserTypeLevel = (certType, level) => ({
  type: SET_USER_TYPE_LEVEL,
  certType: certType,
  level: level
})

export const getUserConfigData = () => {
  return (dispatch, getState) => {
    dispatch(getUserConfigDataAction('')).then(action => {
      let paramList = action.data.body.paramList
      let levelList = [],
          certTypeList = []
      if (paramList) {  
        paramList.filter((item) => {
          if (item.paramType == 'level') {
            levelList.push(item)
          } else if (item.paramType == 'certType') {
            certTypeList.push(item)
          }
        })
        dispatch(setUserTypeLevel(certTypeList, levelList))
      }
    })
  }
}

const initialState = {
  certType: [],
  level: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_TYPE_LEVEL:
      return {
        ...state,
        certType: action.certType,
        level: action.level
      }

    default:
      return state
  }
}
