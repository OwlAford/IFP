import { connect } from 'react-redux'
import { setAddBranchVisible,  branchAdd } from 'REDUCER/branchManage'
import { cleanBranch, updateBranch } from 'REDUCER/common/branchTree'
import BranchAddView from './BranchAddView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  setAddBranchVisible,
  branchAdd
}

const mapStateToProps = (state) => ({
  visible: state.branchManage.addBranchBoxVisible,
  branchNodes: state.branchTree.getBranchList,
  selectBranchId: state.branchTree.selectBranchId,
  branchList: state.branchTree.branchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchAddView)

