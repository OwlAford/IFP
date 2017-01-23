import { connect } from 'react-redux'
import { logout } from 'REDUCER/common/login'
import { setPasswordVisible } from 'REDUCER/main'
import AccountView from './AccountView'

const mapDispatchToProps = {
  logout,
  setPasswordVisible
}

const mapStateToProps = (state) => ({
  loginInfo: state.login
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountView)
