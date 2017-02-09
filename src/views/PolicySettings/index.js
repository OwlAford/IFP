import { connect } from 'react-redux'
// import { } from 'REDUCER/reviewSettings'
import PolicySettingsView from './PolicySettingsView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  name: state.policySettings.pageName
})

export default connect(mapStateToProps, mapDispatchToProps)(PolicySettingsView)
