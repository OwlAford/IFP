import { connect } from 'react-redux'
import { LOGONOUT_OP, logout } from 'REDUCER/login'
import { updateChangePasswordVisible } from 'REDUCER/main'
import AccountView from './AccountView'

const mapDispatchToProps = {
  LOGONOUT_OP,
  logout,
  updateChangePasswordVisible
}

const mapStateToProps = (state) => ({
  loginInfo: state.login,
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)
