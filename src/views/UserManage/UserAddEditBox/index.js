import { connect } from 'react-redux'
import { setAddUserBoxVsisible, addUser, colseModifyUser, updateUser } from 'REDUCER/userManage'
import UserAddEditBoxView from './UserAddEditBoxView'

const mapDispatchToProps = {
  setAddUserBoxVsisible,
  addUser,
  colseModifyUser,
  updateUser
}

const mapStateToProps = (state) => ({
  userBox: state.userManage.userBox,
  branchNodes: state.branchTree.getBranchList,
  branchList: state.branchTree.branchList,
  certType: state.config.certType,
  postList: state.config.post.postList,
  level: state.config.level
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAddEditBoxView)

