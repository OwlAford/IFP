import { connect } from 'react-redux'
import { setBindRoleBoxVisible } from 'REDUCER/roleManage'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {
  setBindRoleBoxVisible
}

const mapStateToProps = (state) => ({
  visible: state.roleManage.bindBoxVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)

