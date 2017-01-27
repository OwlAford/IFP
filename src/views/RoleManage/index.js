import { connect } from 'react-redux'
import { getRoleTree } from 'REDUCER/common/bindRole'
import RoleManageView from './RoleManageView'

const mapDispatchToProps = {
  getRoleTree
}

const mapStateToProps = (state) => ({
  roleList: state.bindRole.roleList
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(RoleManageView)
