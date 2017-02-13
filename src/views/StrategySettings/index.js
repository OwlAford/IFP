import { connect } from 'react-redux'
import { getStrategyList } from 'REDUCER/common/strategy'
import StrategySettingsView from './StrategySettingsView'

const mapDispatchToProps = {
  getStrategyList
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  strategyList: state.strategy.strategyList,
  strategyListSelOpt: state.strategy.strategyListSelOpt,
  totalNum: state.strategy.strategyListTotalNum
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategySettingsView)
