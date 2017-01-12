import { connect } from 'react-redux'
import { initUserMenu } from 'REDUCER/main'
import MainView from './MainView'

const mapDispatchToProps = {
  initUserMenu
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
