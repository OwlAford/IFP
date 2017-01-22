import { connect } from 'react-redux'
import { userPageByBrh, setPreviewBoxVsisible, getRoleByUser } from 'REDUCER/userManage'
import UserTableView from './UserTableView'

const mapDispatchToProps = {
  userPageByBrh,
  setPreviewBoxVsisible,
  getRoleByUser
}

const mapStateToProps = (state) => ({
  dataSource: state.userManage.userList,
  userMenu: state.main.userMenu,
  totalSize: state.userManage.totalSize,
  pageData: state.userManage.pageData
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTableView)
