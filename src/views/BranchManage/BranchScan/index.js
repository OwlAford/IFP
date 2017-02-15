import { connect } from 'react-redux'
import { resetForm, branchModify, changeBranchAfterType, branchDelete } from 'REDUCER/branchManage'
import BranchScanView from './BranchScanView'

const mapDispatchToProps = {
  resetForm,
  branchModify,
  changeBranchAfterType,
  branchDelete
}

const mapStateToProps = state => ({
  selectedBranch: state.branchManage.selectedObject,
  branchNodes: state.branchTree.selectTreeBranchList,
  selectedOperate: state.branchManage.selectedOperate,
  afterOperateType: state.branchManage.afterOperateType,
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchScanView)
