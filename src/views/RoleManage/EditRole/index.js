import { connect } from 'react-redux'
import {  } from 'REDUCER/roleManage'
import EditRoleView from './EditRoleView'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  treeNodes: state.bindRole.getRoleList,
  info: state.roleManage.curRoleInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleView)
