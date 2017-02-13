import { connect } from 'react-redux'
import { getBsnList, getStrategy, getStrategyList } from 'REDUCER/reviewSettings'
import ReviewSettingsView from './ReviewSettingsView'

const mapDispatchToProps = {
  getBsnList,
  getStrategy,
  getStrategyList
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  bsnList: state.reviewSettings.bsnList,
  bsnListTotalNum: state.reviewSettings.bsnListTotalNum,
  bsnSelectOpt: state.reviewSettings.bsnSelectOpt
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSettingsView)
