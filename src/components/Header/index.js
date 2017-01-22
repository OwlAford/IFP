import { connect } from 'react-redux'
import HeaderView from './HeaderView'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  items: state.main.items,
  changePswdVisible: state.main.changePasswordVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView)

