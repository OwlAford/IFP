import { connect } from 'react-redux'
import { userPageByBrh, setAddUserBoxVsisible, updateSelectKeys } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

const mapDispatchToProps = {
  userPageByBrh,
  setAddUserBoxVsisible,
  updateSelectKeys
}

const mapStateToProps = (state) => ({
  userMenu: state.menu.userMenu,
  level: state.config.level,
  userBox: state.userManage.userBox
})

export default connect(mapStateToProps, mapDispatchToProps)(UserQueryView)
