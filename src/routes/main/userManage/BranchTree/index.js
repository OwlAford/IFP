import { connect } from 'react-redux'
import { increment } from 'REDUCER/userManage'
import BranchTreeView from './BranchTreeView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  userManage: state.userManage
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchTreeView)
