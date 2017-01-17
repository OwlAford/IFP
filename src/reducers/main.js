import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import * as actions from 'CONSTANT/types/main'
import { API } from 'CONSTANT/globals'
import utils from 'UTIL/public'
import { message } from 'antd'

/*** Actions ***/
export function selectMenu(currentMenu) {
  return {
    type: actions.SELECT_LEFT_MENU,
    currentMenu: currentMenu
  }
}

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
    id: menu.menuId,
    parentId: menu.menuParentId,
    logo: menu.menuLogo,
    url: menu.menuUrl,
    title: menu.menuName,
    "level": menu.menuLevel,
    menus: [],
    branchList: []
  }
}

function setBugfreeMenu(userMenu) {
   return {
    type: actions.SET_BUGFREE_MENU,
    bugfreeMenu: userMenu
  }
}

export function initUserMenu(cb) {
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
      // 传入回调函数
      if (cb) cb()
    })
  }
}

export function cleanBranch() {
  return {
    type: actions.CLEAN_BRANCH
  }
}

export function changePassword(data, cb) {
  return (dispatch, getState) => {
    dispatch(changePasswordAction(data)).then(action => {
      const flag = action.data.body.opResult
      if (flag=='1') {
        message.success("密码修改成功！")
      } else {
        message.error("密码修改失败，请重试！")
      }
      if (cb) cb()
    })
  }
}

function changePasswordAction(data) {
  return {
    [BZ_REQUESTER]: {
      types: [actions.APP_LIST_REQ, actions.APP_LIST_SUC, actions.APP_LIST_FAL],
      url: API.CHANGE_PASSWORD_URL,
      body: data
    }
  }
}

function groupBranch(branchList, userGetBranchList) {
  return {
    type: actions.USER_GROUP_BRANCH,
    branchList: branchList,
    userGetBranchList: userGetBranchList
  }
}

function getBranchListAction() {
  return {
    [BZ_REQUESTER]: {
      types:[actions.GET_BRANCH_LIST_REQ, actions.GET_BRANCH_LIST_SUC, actions.GET_BRANCH_LIST_FAL],
      url: API.GET_BRANCH_LIST_URL,
      body: {
        queryType: '1'
      }
    }
  }
}

function _converRoleField(branch) {
  return {
    id: branch.brhId,
    parentId: branch.brhParentId,
    name: branch.brhName,
    children: []
  }
}

function getBranch(branch) {
  return {
        "label": branch.brhName,
        "value": branch.brhId,
        "key": branch.brhId,
        "children": [],
  }
}

function groupGetBranch(getBranchList) {
  return {
    type: actions.GET_BRANCH_LIST,
    data: getBranchList
  }
}

export function initBranchList(cb) {
  return (dispatch,state) => {
    dispatch(getBranchListAction()).then(action => {
      let branchList = action.data.body.branchList
      let userGetBranchList = utils.groupList(action.data.body.branchList, "brhId", "brhParentId", "children", _converRoleField)
      
      let getBranchList = utils.groupList(action.data.body.branchList, "brhId", "brhParentId", "children", getBranch)
      dispatch(groupGetBranch(getBranchList)) //新增的时候查机构列表
      dispatch(groupBranch(branchList, userGetBranchList))
      if (cb) cb()
    })
  }
}

export function updateBranch(selectBranch) {
  return {
    type: actions.UPDATE_BRANACH,
    selectBranch: selectBranch ? selectBranch : ''
  }
}

export function sendData(data) {
  return {
    type: actions.SENDDATA,
    data
  } 
}

/*** Reducer ***/
const initialState = {
  // sidebar
  items: [],
  bugfreeMenu: [],
  currentCstIP: '',
  currentLoginTime: '',
  lastCstIP: '',
  lastLoginTime: '',
  loginCount: '',
  isAuthMenuLoaded: false,
  isUserMenuLoaded: false,

  currentPath: window.globalConfig.HOME_PATH,
  currentMenu: window.globalConfig.HOME_MENU,
  openKeys: [window.globalConfig.HOME_ITEM],
  queryItem: [],
  topMenu: [], // 导航菜单
  changePasswordVisible: false,
  userMenu: {},
  systemParam: [],
  // branch
  branchList: [],
  selectBranch: [],
  getBranchList: [],
  userGetBranchList: []
}

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_BRANACH:
      return {
        ...state,
        selectBranch: action.selectBranch
      }
     case actions.CLEAN_BRANCH:
      return {
        ...state,
        selectBranch: ''
      }
    case actions.SELECT_LEFT_MENU:
      let userMenu = state.userMenu
      userMenu = Object.assign({}, userMenu, {currentMenu: action.currentMenu})  
      return {
        ...state,
        currentMenu: action.currentMenu,
        userMenu: userMenu
      }
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
    case actions.MERGE_FINAL_MENU:
      return {
        ...state,
        items: action.items
      }
    case actions.USER_MENU_SUC:
      return {
        ...state,
        isUserMenuLoaded:true,
        currentCstIP: action.data.body.cstCurrLoginIP,
        currentLoginTime: action.data.body.cstCurrLoginTime,
        lastCstIP: action.data.body.cstLastLoginIP,
        lastLoginTime: action.data.body.cstLastLoginTime,
        loginCount: action.data.body.cstLoginTimes
      }
    case actions.SET_BUGFREE_MENU:
      return {
        ...state,
        bugfreeMenu: action.bugfreeMenu
      }
    case actions.USER_GROUP_BRANCH:
      return {
        ...state,
        branchList: action.branchList,
        userGetBranchList: action.userGetBranchList
      }
    case actions.SENDDATA:
      return {
        ...state,
        selectBranch: action.data
      }
    case actions.GET_BRANCH_LIST:
      return {
        ...state,
        getBranchList: action.data
      }
    default:
      return state
  }
}
