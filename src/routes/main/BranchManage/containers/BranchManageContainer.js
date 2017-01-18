import { connect } from 'react-redux'
import { changeBranchSelected, cleanContrclickModify, cleanContrclickDelete, changeBranchOperationModify, resetForm, branchOperationModify, changeBranchOperationAfterType, changeBranchOperationDelete, branchOperationDelete, setAddBranchVisible, branchOperationAdd } from 'REDUCER/branchManage'
import { initBranchList, updateBranch, cleanBranch } from 'REDUCER/main'
import BranchManageView from '../components/BranchManageView'

const mapDispatchToProps = {
  changeBranchSelected,
  initBranchList,
  updateBranch,
  cleanBranch,
  cleanContrclickModify,
  cleanContrclickDelete,
  changeBranchOperationModify,
  resetForm,
  branchOperationModify,
  changeBranchOperationAfterType,
  changeBranchOperationDelete,
  branchOperationDelete,
  setAddBranchVisible,
  branchOperationAdd
}

const mapStateToProps = (state) => ({
  branchManage: state.branchManage,
  main: state.main
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
