import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/common/branchTree'
import { userPageByBrh } from 'REDUCER/userManage'
import RoleManageView from './RoleManageView'

const mapDispatchToProps = {
  initBranchList,
  userPageByBrh
}

const mapStateToProps = (state) => ({
  branchList: state.branchTree.userGetBranchList
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(RoleManageView)
