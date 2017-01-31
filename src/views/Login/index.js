import { connect } from 'react-redux'
import { setSessionID, validateLogin } from 'REDUCER/common/login'
import LoginView from './LoginView'

const mapDispatchToProps = {
  setSessionID,
  validateLogin
}

const mapStateToProps = (state) => ({
  vcodeSrc : state.login.checkCodeSrc
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
