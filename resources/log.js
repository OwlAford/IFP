import CK from 'UTIL/cookie'
const ROUTER_ACTION_TYPE = '@@router/LOCATION_CHANGE'
const REQ_TYPE_LIST = ['APP_MGR_REQ']

export function logger({ dispatch, getState }) {
  return next => action => {
    if (window.globalConfig && window.globalConfig.LOG_ACTION === 'true') {
      let actionLog = getState().common.actionLog
      const actionType = action.type
      let actionParams = ""

      if (actionType == ROUTER_ACTION_TYPE) {
        actionParams = action.payload.search
      }

      const logInfo = {
        actionType: actionType,
        actionTime: new Date().getTime(),
        currentUrl: window.location.pathname,
        sessionId: CK.getCookie('iCIFID'),
        actionParams: actionParams
      }

      if (!(action.url && action.url === window.globalConfig.ACTION_LOG_URL)) {
        actionLog.push(logInfo)
      }
    }
    return next(action)
  }
}
