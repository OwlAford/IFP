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

function fetchAuthMenu() {
  return {
    [BZ_REQUESTER]: {
      types: [actions.AUTH_MENU_REQ, actions.AUTH_MENU_SUC, actions.AUTH_MENU_FAL],
      url: API.AUTHRESOURCE_URL
    }
  }
}

function addWithoutParentNode(id, sourceList, targetList) {
  let sourcenode = utils.getNodeFromGroupList(id, sourceList, 'id', 'menus', treeNodeToMenu)
  if (sourcenode)
    return

  let node = utils.getNodeFromGroupList(id, targetList, 'id', 'menus', treeNodeToMenu)
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
    'level': menu.menuLevel,
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
        message.success('密码修改成功！')
      } else {
        message.error('密码修改失败，请重试！')
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
        'label': branch.brhName,
        'value': branch.brhId,
        'key': branch.brhId,
        'children': [],
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
      let userGetBranchList = utils.groupList(branchList, 'brhId', 'brhParentId', 'children', _converRoleField)
    
      let getBranchList = utils.groupList(branchList, 'brhId', 'brhParentId', 'children', getBranch)
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

function getUserConfigDataAction(data) {
  return {
    [BZ_REQUESTER]: {
      types: [actions.CONFIG_DATA_REQ, actions.CONFIG_DATA_SUC, actions.CONFIG_DATA_FAL],
      url: API.GET_CONFIG_DATA_URL,
      body: {
        paramType: data
      }
    }
  }
}

function setUserTypeLevel(certType, level) {
  return {
    type: actions.SET_USER_TYPE_LEVEL,
    certType: certType,
    level: level
  }
}

export function getUserConfigData() {
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

function getRoleListAction() {
  return {
    [BZ_REQUESTER]: {
      types: [actions.ROLE_QUERY_REQ, actions.ROLE_QUERY_SUC, actions.ROLE_QUERY_FAL],
      url: API.GET_ROLE_LIST_URL,
      body: {}
    }
  }
}

function roleTreeList(list) {
  return {
    type: actions.ROLE_TREE_LIST,
    data: list
  }
}

// 用户绑定角色所需要数据的类型
function getRoleField({roleName, roleId}) {
  return {
    label: roleName,
    value: roleId,
    key: roleId,
    children: []
  }
}

// 查询所有角色时，树所需要的类型
function converRoleField({roleId, rolePId, roleName, roleDesc, roleStatus, roleType}) {
  return {
    roleId: roleId,
    rolePId: rolePId,
    roleName: roleName,
    roleDesc: roleDesc,
    roleStatus: roleStatus,
    roleType: roleType,
    children: []
  }
}

function updateRoleTree(list) {
  return {
    type: actions.UPDATE_ROLE_TREE,
    data: list
  }
}

export function getRoleTree() {
  return (dispatch, getState) => {
    dispatch(getRoleListAction()).then(action => {
      let dataRoleList = action.data.body.roleList
      let roleList = utils.groupList(dataRoleList, 'roleId', 'rolePId', 'children', converRoleField)
      let getRoleList = utils.groupList(dataRoleList,'roleId', 'rolePId', 'children', getRoleField)
      dispatch(roleTreeList(getRoleList))
      dispatch(updateRoleTree(roleList))
    })
  }
}

// 查询用户等级 + 证件类型配置信息 + 角色树
export function initUserForm() {
  return (dispatch, getState) => {
    dispatch(getUserConfigData())
    dispatch(getRoleTree())
  }
}

export function getRoleByUserAction(num) {
  return {
    [BZ_REQUESTER]: {
      types: [actions.ROLE_QUERY_REQ, actions.ROLE_QUERY_SUC, actions.ROLE_QUERY_FAL],
      url: API.GET_ROLE_BY_USER_URL,
      body:{
        userNo: num
      }
    }
  }
}

/*** Reducer ***/
const initialState = {

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

  userMenu: {},
  topMenu: [],
  queryItem: [],
  systemParam: [],
  changePasswordVisible: false,

  // branch
  selectBranch: '',
  branchList: [],
  getBranchList: [],
  userGetBranchList: [],

  // user config
  certType: [],
  level: [],
  getRoleList: [],
  roleList: []
}

export default function mainReducer(state = initialState, action) {
  switch (action.type) {

    case actions.SET_USER_TYPE_LEVEL:
      return {
        ...state,
        certType: action.certType,
        level: action.level
      }

     case actions.ROLE_TREE_LIST:
      return {
        ...state,
        getRoleList: action.data
      }

    case actions.UPDATE_ROLE_TREE:
      return {
        ...state,
        roleList: action.data
      }

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
      const data = action.data.body
      return {
        ...state,
        isUserMenuLoaded:true,
        currentCstIP: data.cstCurrLoginIP,
        currentLoginTime: data.cstCurrLoginTime,
        lastCstIP: data.cstLastLoginIP,
        lastLoginTime: data.cstLastLoginTime,
        loginCount: data.cstLoginTimes
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
