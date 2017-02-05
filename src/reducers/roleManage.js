import NProgress from 'nprogress'
import { message, notification } from 'antd'
import { getRoleTree } from './common/bindRole'
import { getAllRoleFnItemsAction, getInfoByRoleIdAction, getInfoByRoleNameAction, updateRoleAction } from './request/role'

const CLEAR_TABLE_ITEMS = 'CLEAR_TABLE_ITEMS'
const UPDATE_TABLE_CUR_ITEMS = 'UPDATE_TABLE_CUR_ITEMS'
const UPDATE_CUR_ROLE_INFO = 'UPDATE_CUR_ROLE_INFO'
const SET_SELECT_TREE_VAL = 'SET_SELECT_TREE_VAL'


const updateTableItems = (tableCurPageItems, tableCurPage, tableTotalSize) => ({
  type: UPDATE_TABLE_CUR_ITEMS,
  data: {
    tableCurPageItems,
    tableCurPage,
    tableTotalSize
  }
})

// 清空table列表
export const clearTableItems = () => ({
  type: CLEAR_TABLE_ITEMS
})

// 获取角色详情和功能列表
export const getAllRoleFnItems = (curPage, roleId, roleName, state) => {
  return (dispatch, getState) => {
    if (!roleId) {
      dispatch(clearTableItems())
    } else {
      dispatch(getAllRoleFnItemsAction(curPage, roleId, roleName, state, getState().roleManage.pageSize)).then(action => { 
        const dataBody = action.data.body
        if (dataBody.errorCode == '0') {
          const roleMenuItemRelList = dataBody.roleMenuItemRelList
          const turnPageTotalNum = dataBody.turnPageTotalNum
          if (state == '1') {
            // 复制数组，并为其添加key属性，用于table遍历生成
            let tableCurPageItems = [].concat(roleMenuItemRelList)
            roleMenuItemRelList.map((item, i) => {
              tableCurPageItems[i].key = item.menuItemId
            })
            dispatch(updateTableItems(tableCurPageItems, curPage, turnPageTotalNum))
          }
        } else {
          message.error('获取列表失败！')
        }

      })
    }
  }
}

// 清除当前选中角色信息
export const clearCurRoleInfo = () => ({
  type: UPDATE_CUR_ROLE_INFO,
  data: {
    roleDesc: '',
    selectModifyRole: '',
    roleStatus: '',
    roleName: '',
    roleId: ''
  }
})

const applyCurRoleInfo = (info) =>({
  type: UPDATE_CUR_ROLE_INFO,
  data: {
    roleDesc: info.roleDesc,
    selectModifyRole: info.rolePId,
    roleStatus: info.roleStatus,
    roleName: info.roleName,
    roleId: info.roleId
  }
})

// 通过角色id获取当前选中角色信息
export const getInfoByRoleId = roleId => {
  return (dispatch, getState) => {
    NProgress.start()
    dispatch(getInfoByRoleIdAction(roleId)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        dispatch(applyCurRoleInfo(dataBody))
        NProgress.done()
        message.success("加载完毕！")
      } else {
        NProgress.done()
        message.error('获取信息失败！')
      }
    })
  }
}

// 通过角色名搜索相关信息
export const getInfoByRoleName = (roleName, cb) => {
  return (dispatch, getState) => {
    NProgress.start()
    dispatch(getInfoByRoleNameAction(roleName)).then(action => {
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        dispatch(applyCurRoleInfo(dataBody))
        NProgress.done()
        message.success("加载完毕！")
        if (cb) cb(dataBody)
      } else {
        NProgress.done()
        message.error('获取信息失败！')
      }
    })
  }
}

// 用户修改所属角色 selectTree
export const setSelectTreeVal = val => ({
  type: SET_SELECT_TREE_VAL,
  data: val
})

// 更新角色信息
export const updateRole = params => {
  return (dispatch, getState) => {
    dispatch(updateRoleAction(params)).then(action=>{
      const dataBody = action.data.body
      if (dataBody.errorCode == '0') {
        notification.success({
          message: '成功',
          description: '角色更新成功！'
        })
        // 刷新一次选择的树
        dispatch(getRoleTree())
        dispatch(getInfoByRoleId(params.roleId))
      } else {
        notification.warning({
          message: '失败',
          description: '角色更新失败！'
        })
      }
    })
  }
}


const initialState = {
  pageSize: 8,
  tableCurPageItems: [],
  tableCurPage: 1,
  tableTotalSize: 0,
  curRoleInfo: {
    roleDesc: '',
    selectModifyRole: '',
    roleStatus: '',
    roleName: '',
    roleId: ''
  },
  selectModifyRole: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TABLE_ITEMS: {
      return {
        ...state,
        tableCurPageItems: [],
        tableCurPage: 1,
        tableTotalSize: 0
      }
    }

    case UPDATE_TABLE_CUR_ITEMS:
      return {
        ...state,
        ...action.data
      }

    case UPDATE_CUR_ROLE_INFO:
      return {
        ...state,
        curRoleInfo: action.data,
        selectModifyRole: action.data.selectModifyRole
      }

    case SET_SELECT_TREE_VAL:
      return {
        ...state,
        selectModifyRole: action.data
      }

    default:
      return state
  }
}
