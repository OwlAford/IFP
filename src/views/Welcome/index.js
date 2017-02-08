import { connect } from 'react-redux'
import WelcomeView from './WelcomeView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  main: state.main
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeView)
