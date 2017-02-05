import { connect } from 'react-redux'
import { setSelectTreeVal, updateRole } from 'REDUCER/roleManage'
import EditRoleView from './EditRoleView'

const mapDispatchToProps = {
  setSelectTreeVal,
  updateRole
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu,
  treeNodes: state.bindRole.getRoleList,
  info: state.roleManage.curRoleInfo,
  selectModifyRole: state.roleManage.selectModifyRole
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleView)
