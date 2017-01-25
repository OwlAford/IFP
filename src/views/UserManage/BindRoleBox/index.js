import { connect } from 'react-redux'
import { closeBindRole } from 'REDUCER/userManage'
import { updateRoleTree, userRoleAssociation } from 'REDUCER/common/bindRole'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {
  closeBindRole,
  updateRoleTree,
  userRoleAssociation
}

const mapStateToProps = (state) => ({
  visible: state.userManage.bindRoleBox.visible,
  treeNodes: state.bindRole.userGetRoleList,
  selectRoleList: state.bindRole.updateUserRoleList,
  roleRelList: state.bindRole.roleRelList,
  info: state.userManage.bindRoleBox.info
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)
