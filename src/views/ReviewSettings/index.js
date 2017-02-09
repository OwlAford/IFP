import { connect } from 'react-redux'
// import { } from 'REDUCER/reviewSettings'
import ReviewSettingsView from './ReviewSettingsView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  name: state.reviewSettings.pageName
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSettingsView)
