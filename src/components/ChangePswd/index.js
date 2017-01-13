import { connect } from 'react-redux'
import { updateChangePasswordVisible, changePassword } from 'REDUCER/main'
import ChangePswdView from './ChangePswdView'

const mapDispatchToProps = {
  updateChangePasswordVisible,
  changePassword
}

const mapStateToProps = (state) => ({
  changePwdVisible: state.main.changePwdVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePswdView)
