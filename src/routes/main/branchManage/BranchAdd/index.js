import { connect } from 'react-redux'
import { setAddBranchVisible,  branchAdd } from 'REDUCER/branchManage'
import { cleanBranch, updateBranch } from 'REDUCER/common/branch'
import BranchAddView from './BranchAddView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  setAddBranchVisible,
  branchAdd
}

const mapStateToProps = (state) => ({
  visible: state.branchManage.addBranchBoxVisible,
  branchNodes: state.branch.getBranchList,
  selectBranchId: state.branch.selectBranch,
  branchList: state.branch.branchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchAddView)

