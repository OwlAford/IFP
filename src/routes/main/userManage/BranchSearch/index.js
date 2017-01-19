import { connect } from 'react-redux'
import { increment } from 'REDUCER/userManage'
import BranchSearchView from './BranchSearchView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  userManage: state.userManage
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSearchView)
