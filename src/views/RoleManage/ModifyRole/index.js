import { connect } from 'react-redux'
import {  } from 'REDUCER/roleManage'
import ModifyRoleView from './ModifyRoleView'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  treeNodes: state.bindRole.getRoleList

})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyRoleView)
