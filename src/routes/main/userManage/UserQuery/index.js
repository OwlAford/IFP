import { connect } from 'react-redux'
import { userPageByBrh } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

const mapDispatchToProps = {
  userPageByBrh
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu
})

export default connect(mapStateToProps, mapDispatchToProps)(UserQueryView)
