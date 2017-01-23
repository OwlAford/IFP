import { connect } from 'react-redux'
import { setAddUserBoxVsisible, addUser } from 'REDUCER/userManage'
import { cleanBranch, updateBranch } from 'REDUCER/common/branchTree'
import UserAddView from './UserAddView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  setAddUserBoxVsisible,
  addUser
}

const mapStateToProps = (state) => ({
  visible: state.userManage.addUserBoxVisible,
  branchNodes: state.branchTree.getBranchList,
  selectBranchId: state.branchTree.selectBranchId,
  branchList: state.branchTree.branchList,
  certType: state.config.certType,
  postList: state.config.post.postList,
  level: state.config.level
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAddView)

