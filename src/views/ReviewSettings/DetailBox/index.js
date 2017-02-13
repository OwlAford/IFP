import { connect } from 'react-redux'
import {  } from 'REDUCER/reviewSettings'
import DetailBoxView from './DetailBoxView'

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
  detail: state.reviewSettings.strategyDetail
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailBoxView)

