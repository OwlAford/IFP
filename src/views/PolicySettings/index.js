import { connect } from 'react-redux'
// import { } from 'REDUCER/reviewSettings'
import PolicySettingsView from './PolicySettingsView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
})

export default connect(mapStateToProps, mapDispatchToProps)(PolicySettingsView)
