import { connect } from 'react-redux'
import { initUserMenu, selectMenu, initUserForm } from 'REDUCER/main'
import MainView from './MainView'

const mapDispatchToProps = {
  initUserMenu,
  selectMenu,
  initUserForm
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
