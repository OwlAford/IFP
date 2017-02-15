import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/common/branchTree'
import { changeBranchSelected, resetForm } from 'REDUCER/branchManage'
import BranchManageView from './BranchManageView'

const mapDispatchToProps = {
  initBranchList,
  changeBranchSelected,
  resetForm
}

const mapStateToProps = state => ({
  treeBranchList: state.branchTree.treeBranchList,
  branchId: state.branchManage.brhId
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
