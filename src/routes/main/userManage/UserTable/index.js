import { connect } from 'react-redux'
import { increment } from 'REDUCER/userManage'
import UserTableView from './UserTableView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  dataSource: state.userManage.userList,
  userMenu: state.main.userMenu
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTableView)
