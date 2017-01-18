import { connect } from 'react-redux'
import { changeBranchSelected, cleanContrclickModify, cleanContrclickDelete, changeBranchOperationModify, changeBranchOperationDelete, setAddBranchVisible } from 'REDUCER/branchManage'
import BranchSearchView from './BranchSearchView'

const mapDispatchToProps = {
  changeBranchSelected,
  cleanContrclickModify,
  cleanContrclickDelete,
  changeBranchOperationModify,
  changeBranchOperationDelete,
  setAddBranchVisible
}

const mapStateToProps = (state) => ({
  userMenu: state.main.userMenu,
  branchList: state.main.branchList,
  modifyVisible: state.branchManage.modifyVisible,
  deleteVisible: state.branchManage.deleteVisible,
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSearchView)
