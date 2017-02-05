import { connect } from 'react-redux'
import { setAddRoleBoxVisible, addRole } from 'REDUCER/roleManage'
import AddRoleBoxView from './AddRoleBoxView'

const mapDispatchToProps = {
  setAddRoleBoxVisible,
  addRole
}

const mapStateToProps = (state) => ({
  treeNodes: state.bindRole.getRoleList,
  visible: state.roleManage.addBoxVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRoleBoxView)

