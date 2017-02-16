import { connect } from 'react-redux'
import { setPasswordVisible } from 'REDUCER/common/main'
import { changePassword } from 'REDUCER/common/password'
import ChangePswdView from './ChangePswdView'

const mapDispatchToProps = {
  setPasswordVisible,
  changePassword
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePswdView)
