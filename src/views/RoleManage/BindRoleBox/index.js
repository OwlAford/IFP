import { connect } from 'react-redux'
import { } from 'REDUCER/roleManage'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  treeNodes: state.bindRole.getRoleList,
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)

