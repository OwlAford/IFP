import { connect } from 'react-redux'
import { setAddUserBoxVsisible, addUser, colseModifyUser, updateUser } from 'REDUCER/userManage'
import { cleanBranch, updateBranch } from 'REDUCER/common/branchTree'
import UserAddEditBoxView from './UserAddEditBoxView'

const mapDispatchToProps = {
  cleanBranch,
  updateBranch,
  setAddUserBoxVsisible,
  addUser,
  colseModifyUser,
  updateUser
}

const mapStateToProps = (state) => ({
  userBox: state.userManage.userBox,
  branchNodes: state.branchTree.getBranchList,
  selectBranchId: state.branchTree.selectBranchId,
  branchList: state.branchTree.branchList,
  certType: state.config.certType,
  postList: state.config.post.postList,
  level: state.config.level
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAddEditBoxView)

