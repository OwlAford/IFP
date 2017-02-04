import { connect } from 'react-redux'
import { setAddBranchVisible,  branchAdd, setAddSelectBrhId } from 'REDUCER/branchManage'
import BranchAddView from './BranchAddView'

const mapDispatchToProps = {
  setAddBranchVisible,
  branchAdd,
  setAddSelectBrhId
}

const mapStateToProps = (state) => ({
  visible: state.branchManage.addBranchBoxVisible,
  branchNodes: state.branchTree.getBranchList,
  selectBranchId: state.branchManage.addSelectBranchId,
  branchList: state.branchTree.branchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchAddView)

