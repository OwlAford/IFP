import { connect } from 'react-redux'
import { getBsnList, getStrategy} from 'REDUCER/reviewSettings'
import { getStrategyList } from 'REDUCER/common/strategy'
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
