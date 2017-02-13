import { connect } from 'react-redux'
import { getBsnList } from 'REDUCER/reviewSettings'
import ReviewSettingsView from './ReviewSettingsView'

const mapDispatchToProps = {
  getBsnList
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  bsnList: state.reviewSettings.bsnList,
  bsnListTotalNum: state.reviewSettings.bsnListTotalNum,
  bsnSelectOpt: state.reviewSettings.bsnSelectOpt
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSettingsView)
