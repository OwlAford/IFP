import { connect } from 'react-redux'
import { resetForm, setAddBranchVisible, branchModify, branchDelete, changeBranchSelected } from 'REDUCER/branchManage'
import BranchScanView from './BranchScanView'

const mapDispatchToProps = {
  resetForm,
  setAddBranchVisible,
  branchModify, 
  branchDelete,
  changeBranchSelected
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  selectedBranch: state.branchManage.selectedObject,
  branchNodes: state.branchTree.selectTreeBranchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchScanView)
