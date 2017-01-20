import { connect } from 'react-redux'
import { changeBranchSelected, changeBranchModify, changeBranchDelete, setAddBranchVisible } from 'REDUCER/branchManage'
import BranchSearchView from './BranchSearchView'

const mapDispatchToProps = {
  changeBranchSelected,
  changeBranchModify,
  changeBranchDelete,
  setAddBranchVisible
}

const mapStateToProps = (state) => ({
  userMenu: state.main.userMenu,
  branchList: state.main.branchList,
  selectedBranch: state.branchManage.selectedObject
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSearchView)
