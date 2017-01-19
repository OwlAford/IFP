import { connect } from 'react-redux'
import { changeBranchSelected } from 'REDUCER/branchManage'
import BranchTreeView from './BranchTreeView'

const mapDispatchToProps = {
  changeBranchSelected
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchTreeView)
