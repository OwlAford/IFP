import { connect } from 'react-redux'
import { resetForm, branchModify, changeBranchAfterType, branchDelete } from 'REDUCER/branchManage'
import { updateBranch, cleanBranch } from 'REDUCER/common/branchTree'
import BranchScanView from './BranchScanView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  resetForm,
  branchModify,
  changeBranchAfterType,
  branchDelete
}

const mapStateToProps = (state) => ({
  selectedBranch: state.branchManage.selectedObject,
  branchNodes: state.branchTree.getBranchList,
  selectBranchId: state.branchTree.selectBranchId,
  selectedOperate: state.branchManage.selectedOperate,
  afterOperateType: state.branchManage.afterOperateType,
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchScanView)
