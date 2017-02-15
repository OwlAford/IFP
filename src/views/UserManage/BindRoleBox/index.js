import { connect } from 'react-redux'
import { closeBindRole } from 'REDUCER/userManage'
import { updateSelectedRole, userRoleAssociation } from 'REDUCER/common/bindRole'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {
  closeBindRole,
  updateSelectedRole,
  userRoleAssociation
}

const mapStateToProps = state => ({
  visible: state.userManage.bindRoleBox.visible,
  treeNodes: state.bindRole.selectRoleTreeList,
  selectedRoleList: state.bindRole.selectedRoleList,
  allSelectRoleList: state.bindRole.allSelectRoleList,
  info: state.userManage.bindRoleBox.info
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)
