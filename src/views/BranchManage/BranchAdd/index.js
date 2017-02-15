import { connect } from 'react-redux'
import { setAddBranchVisible,  branchAdd } from 'REDUCER/branchManage'
import BranchAddView from './BranchAddView'

const mapDispatchToProps = {
  setAddBranchVisible,
  branchAdd
}

const mapStateToProps = state => ({
  visible: state.branchManage.addBranchBoxVisible,
  branchNodes: state.branchTree.selectTreeBranchList,
  allBranchList: state.branchTree.allBranchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchAddView)

