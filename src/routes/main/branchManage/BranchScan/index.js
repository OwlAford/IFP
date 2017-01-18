import { connect } from 'react-redux'
import { resetForm, branchOperationModify, changeBranchOperationAfterType, branchOperationDelete } from 'REDUCER/branchManage'
import { updateBranch, cleanBranch } from 'REDUCER/main'
import BranchScanView from './BranchScanView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  resetForm,
  branchOperationModify,
  changeBranchOperationAfterType,
  branchOperationDelete
}

const mapStateToProps = (state) => ({
  selectedBranch: state.branchManage.selectedObject,
  branchNodes: state.main.getBranchList,
  selectBranchId: state.main.selectBranch,
  selectedOperate: state.branchManage.selectedOperate,
  afterOperateType: state.branchManage.afterOperateType,
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchScanView)
