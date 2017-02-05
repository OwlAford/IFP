import { connect } from 'react-redux'
import { setSelectTreeVal, updateRole, setAddRoleBoxVisible, setBindRoleBoxVisible } from 'REDUCER/roleManage'
import EditRoleView from './EditRoleView'

const mapDispatchToProps = {
  setSelectTreeVal,
  updateRole,
  setAddRoleBoxVisible,
  setBindRoleBoxVisible
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu,
  treeNodes: state.bindRole.getRoleList,
  info: state.roleManage.curRoleInfo,
  selectModifyRole: state.roleManage.selectModifyRole
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleView)
