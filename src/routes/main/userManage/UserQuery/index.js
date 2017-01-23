import { connect } from 'react-redux'
import { userPageByBrh, setAddUserBoxVsisible } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

const mapDispatchToProps = {
  userPageByBrh,
  setAddUserBoxVsisible
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu
})

export default connect(mapStateToProps, mapDispatchToProps)(UserQueryView)
