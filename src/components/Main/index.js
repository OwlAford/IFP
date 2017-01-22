import { connect } from 'react-redux'
import { initUserMenu, initUserForm } from 'REDUCER/main'
import MainView from './MainView'

const mapDispatchToProps = {
  initUserMenu,
  initUserForm
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
