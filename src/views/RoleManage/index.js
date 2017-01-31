import { connect } from 'react-redux'
import { getRoleTree } from 'REDUCER/common/bindRole'
import RoleManageView from './RoleManageView'

const mapDispatchToProps = {
  getRoleTree
}

const mapStateToProps = (state) => ({
  roleList: state.bindRole.roleList
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleManageView)
