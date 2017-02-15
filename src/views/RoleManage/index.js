import { connect } from 'react-redux'
import { getRoleTree } from 'REDUCER/common/bindRole'
import { getAllRoleFnItems, getInfoByRoleId, clearCurRoleInfo, getInfoByRoleName } from 'REDUCER/roleManage'
import RoleManageView from './RoleManageView'

const mapDispatchToProps = {
  getRoleTree,
  getAllRoleFnItems,
  getInfoByRoleId,
  clearCurRoleInfo,
  getInfoByRoleName
}

const mapStateToProps = state => ({
  roleTreeList: state.bindRole.roleTreeList,
  curRoleId: state.roleManage.curRoleInfo.roleId
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleManageView)
