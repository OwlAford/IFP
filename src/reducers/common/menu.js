import utils from 'UTIL/public'
import NProgress from 'nprogress'
import { getMenuAction } from '../request/menu'
import { refreshInfo } from './main'

const SAVE_USER_MENU = 'SAVE_USER_MENU'
const MERGE_FINAL_MENU = 'MERGE_FINAL_MENU'
const SELECT_LEFT_MENU = 'SELECT_LEFT_MENU'

export const selectMenu = currentMenu => ({
  type: SELECT_LEFT_MENU,
  currentMenu: currentMenu
})

const mergeFinalMenu = menu => ({
  type: MERGE_FINAL_MENU,
  items: menu
})

const converMenuField = menu => ({
  id: menu.menuId,
  parentId: menu.menuParentId,
  logo: menu.menuLogo,
  url: menu.menuUrl,
  title: menu.menuName,
  level: menu.menuLevel,
  menus: [],
  branchList: []
})

const addWithoutParentNode = (id, sourceList, targetList) => {
  let sourcenode = utils.getNodeFromGroupList(id, sourceList, 'id', 'menus', treeNodeToMenu)
  if (sourcenode)
    return

  let node = utils.getNodeFromGroupList(id, targetList, 'id', 'menus', treeNodeToMenu)
  if (!node)
    return

  sourceList.push(node)
  addWithoutParentNode(node.parentId, sourceList, targetList)
}

export const initUserMenu = (cb) => {
  let authMenu = []
  let userMenu = []
  let topMenu = []
  return (dispatch, getState) => {
    let currentPath = getState().main.currentPath
    NProgress.start()
    dispatch(getMenuAction()).then(action => {
      const dataBody = action.data.body
      dispatch({
        type: SAVE_USER_MENU,
        userMenu: {
          menuList: dataBody.menuList,
          menuItemList: dataBody.menuItemList
        }
      })
      authMenu = utils.groupList(dataBody.menuList, 'id', 'parentId', 'menus', converMenuField)
      authMenu.map(data => {
        data.level == '0' ? topMenu.push(data) : null
      })

      let userMenuMap = {}
      let rawUserMenu = dataBody.menuList
      rawUserMenu.forEach(value => {
        userMenuMap[value.id] = value
      })
      rawUserMenu.forEach(value => {
        if(value.parentId && !userMenuMap[value.parentId]) {
          addWithoutParentNode(value.parentId, rawUserMenu, authMenu)
        }
      })
      userMenu = utils.groupList(rawUserMenu, 'menuId', 'menuParentId', 'menus', converMenuField)
      // 其分发的为侧边栏的 reducer
      dispatch(mergeFinalMenu(userMenu))
      dispatch(refreshInfo(action.data))
      // 传入回调函数
      NProgress.done()
      if (cb) cb()
    })
  }
}


const initialState = {
  items: [],
  topMenu: [],
  userMenu: {},
  currentMenu: window.globalConfig.HOME_MENU
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SAVE_USER_MENU:
      return {
        ...state,
        userMenu: action.userMenu
      }

    case MERGE_FINAL_MENU:
      return {
        ...state,
        items: action.items
      }

    case SELECT_LEFT_MENU:
      let userMenu = state.userMenu
      userMenu = Object.assign({}, userMenu, {currentMenu: action.currentMenu})  
      return {
        ...state,
        currentMenu: action.currentMenu,
        userMenu: userMenu
      }

    default:
      return state
  }
}
