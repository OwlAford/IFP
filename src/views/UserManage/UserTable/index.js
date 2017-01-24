import { connect } from 'react-redux'
import { userPageByBrh, setPreviewBoxVsisible, setBindRoleBoxVsisible, previewUser, modifyUser, userBindRole } from 'REDUCER/userManage'
import { getUserRoleTree } from 'REDUCER/common/bindRole'
import UserTableView from './UserTableView'

const mapDispatchToProps = {
  userPageByBrh,
  setPreviewBoxVsisible,
  setBindRoleBoxVsisible,
  previewUser,
  modifyUser,
  userBindRole,
  getUserRoleTree
}

const mapStateToProps = (state) => ({
  dataSource: state.userManage.userList,
  userMenu: state.menu.userMenu,
  totalSize: state.userManage.totalSize,
  pageData: state.userManage.pageData
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTableView)
