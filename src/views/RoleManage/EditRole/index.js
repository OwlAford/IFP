import { connect } from 'react-redux'
import { setSelectTreeVal, updateRole, setAddRoleBoxVisible, setBindRoleBoxVisible, delRole } from 'REDUCER/roleManage'
import EditRoleView from './EditRoleView'

const mapDispatchToProps = {
  setSelectTreeVal,
  updateRole,
  setAddRoleBoxVisible,
  setBindRoleBoxVisible,
  delRole
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu,
  treeNodes: state.bindRole.getRoleList,
  info: state.roleManage.curRoleInfo,
  selectModifyRole: state.roleManage.selectModifyRole
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleView)
