import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/main'
import { userPageByBrh } from 'REDUCER/userManage'
import UserManageView from './UserManageView'

const mapDispatchToProps = {
  initBranchList,
  userPageByBrh
}

const mapStateToProps = (state) => ({
  branchList: state.main.userGetBranchList
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(UserManageView)
