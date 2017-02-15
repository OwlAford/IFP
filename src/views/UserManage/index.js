import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/common/branchTree'
import { userPageByBrh } from 'REDUCER/userManage'
import UserManageView from './UserManageView'

const mapDispatchToProps = {
  initBranchList,
  userPageByBrh
}

const mapStateToProps = state => ({
  treeBranchList: state.branchTree.treeBranchList,
  allBranchList: state.branchTree.allBranchList,
  selectedKeys: state.userManage.selectedKeys
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManageView)
