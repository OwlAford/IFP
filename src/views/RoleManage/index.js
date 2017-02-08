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
  roleList: state.bindRole.roleList,
  curRoleId: state.roleManage.curRoleInfo.roleId
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleManageView)
