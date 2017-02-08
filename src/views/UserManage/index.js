import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/common/branchTree'
import { userPageByBrh } from 'REDUCER/userManage'
import UserManageView from './UserManageView'

const mapDispatchToProps = {
  initBranchList,
  userPageByBrh
}

const mapStateToProps = state => ({
  branchList: state.branchTree.userGetBranchList,
  flatBranchList: state.branchTree.branchList,
  selectedKeys: state.userManage.selectedKeys
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManageView)
