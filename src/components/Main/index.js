import { connect } from 'react-redux'
import { initUserForm } from 'REDUCER/common/main'
import { initUserMenu } from 'REDUCER/common/menu'
import MainView from './MainView'

const mapDispatchToProps = {
  initUserMenu,
  initUserForm
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
