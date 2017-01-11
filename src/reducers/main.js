import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import * as actions from 'CONSTANT/types/main'
import { API } from 'CONSTANT/globals'
import utils from 'UTIL/public'
import { message } from 'antd'

/*** Actions ***/
export function updateChangePasswordVisible(changePasswordVisible) {
  return {
    type: actions.CHANGE_PASSWORD,
    changePasswordVisible: changePasswordVisible
  }
}

function fetchAuthMenu () {
  return {
    [BZ_REQUESTER]: {
      types: [actions.AUTH_MENU_REQ, actions.AUTH_MENU_SUC, actions.AUTH_MENU_FAL],
      url: API.AUTHRESOURCE_URL
    }
  }
}

function addWithoutParentNode(id, sourceList, targetList) {
  let sourcenode = utils.getNodeFromGroupList(id, sourceList, "id", "menus", treeNodeToMenu)
  if (sourcenode)
    return

  let node = utils.getNodeFromGroupList(id, targetList, "id", "menus", treeNodeToMenu)
  if (!node)
    return

  sourceList.push(node)
  addWithoutParentNode(node.parentId, sourceList, targetList)
}

export function mergeFinalMenu(menu) {
  return {
    type: actions.MERGE_FINAL_MENU,
    items: menu
  }
}

export function updataLoginMsg(data) {
    return {
      type: actions.USER_MENU_SUC,
      data: data
    }
}

export function converMenuField(menu) {
  return {
    "id": menu.menuId,
    "parentId": menu.menuParentId,
    "logo": menu.menuLogo,
    "url": menu.menuUrl,
    "title": menu.menuName,
    "level": menu.menuLevel,
    "menus": []
  }
}

export function initUserMenu() {
  let authMenu = []
  let userMenu = []
  let topMenu = []
  return (dispatch, getState) => {
    let currentPath = getState().main.currentPath
    dispatch(fetchAuthMenu()).then(action => {
      dispatch({
        type: actions.SAVE_USER_MENU,
        userMenu: {
          menuList: action.data.body.menuList,
          menuItemList: action.data.body.menuItemList
        }
      })
      authMenu = utils.groupList(action.data.body.menuList, 'id', 'parentId', 'menus', converMenuField)
      authMenu.map(data => {
        if(data.level == '0') {
          topMenu.push(data)
        }
      })

      let userMenuMap = {}
      let rawUserMenu = action.data.body.menuList
      rawUserMenu.forEach((value) => {
        userMenuMap[value.id] = value
      })
      rawUserMenu.forEach((value) => {
        if(value.parentId && !userMenuMap[value.parentId]) {
          addWithoutParentNode(value.parentId, rawUserMenu, authMenu)
        }
      })
      userMenu = utils.groupList(rawUserMenu, 'menuId', 'menuParentId', 'menus', converMenuField)
      // 其分发的为侧边栏的 reducer
      dispatch(mergeFinalMenu(userMenu))
      dispatch(updataLoginMsg(action.data))
    })
  }
}

/*** Reducer ***/
const initialState = {
  currentPath: window.globalConfig.HOME_PATH,
  currentMenu: window.globalConfig.HOME_MENU,
  openKeys: [window.globalConfig.HOME_ITEM],
  queryItem: [],
  topMenu: [], // 导航菜单
  changePasswordVisible: false,
  userMenu: {},
  systemParam: []
}

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordVisible: action.changePasswordVisible
      }
    case actions.SAVE_USER_MENU:
      return {
        ...state,
        userMenu: action.userMenu
      }
    default:
      return state
  }
}
