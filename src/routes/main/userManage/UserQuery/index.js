import { connect } from 'react-redux'
import { userPageByBrh } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

const mapDispatchToProps = {
  userPageByBrh
}

const mapStateToProps = (state) => ({
  userMenu: state.main.userMenu
})

export default connect(mapStateToProps, mapDispatchToProps)(UserQueryView)
