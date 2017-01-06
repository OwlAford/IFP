import { connect } from 'react-redux'
import { triple, setSessionID, validateLogin } from 'REDUCER/login'
import LoginView from '../components/LoginView'

const mapDispatchToProps = {
  triple,
  setSessionID,
  validateLogin
}

const mapStateToProps = (state) => ({
  count : state.login.count,
  vcodeSrc : state.login.checkCodeSrc
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
