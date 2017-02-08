import { connect } from 'react-redux'
import HeaderView from './HeaderView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  items: state.menu.items,
  passwordVisible: state.main.passwordVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView)

