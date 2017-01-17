import { connect } from 'react-redux'
import { initUserMenu, selectMenu } from 'REDUCER/main'
import MainView from './MainView'

const mapDispatchToProps = {
  initUserMenu,
  selectMenu
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
