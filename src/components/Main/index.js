import { connect } from 'react-redux'
import { LOGONOUT_OP, logout } from 'REDUCER/login'
import { updateChangePasswordVisible, initUserMenu } from 'REDUCER/main'
import MainView from './MainView'

const mapDispatchToProps = {
  updateChangePasswordVisible,
  initUserMenu
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
