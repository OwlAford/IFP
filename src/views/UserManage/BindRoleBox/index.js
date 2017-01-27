import { connect } from 'react-redux'
import { closeBindRole } from 'REDUCER/userManage'
import { updateSelectedRole, userRoleAssociation } from 'REDUCER/common/bindRole'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {
  closeBindRole,
  updateSelectedRole,
  userRoleAssociation
}

const mapStateToProps = (state) => ({
  visible: state.userManage.bindRoleBox.visible,
  treeNodes: state.bindRole.userGetRoleList,
  selectRoleList: state.bindRole.selectedRoleList,
  roleRelList: state.bindRole.roleRelList,
  info: state.userManage.bindRoleBox.info
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)
