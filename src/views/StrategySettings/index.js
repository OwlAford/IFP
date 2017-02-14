import { connect } from 'react-redux'
import { getStrategyList } from 'REDUCER/common/strategy'
import { setAddEditModalVisible, deleteStrategy } from 'REDUCER/strategySettings'
import StrategySettingsView from './StrategySettingsView'

const mapDispatchToProps = {
  getStrategyList,
  setAddEditModalVisible,
  deleteStrategy
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  strategyList: state.strategy.strategyList,
  strategyListSelOpt: state.strategy.strategyListSelOpt,
  totalNum: state.strategy.strategyListTotalNum,
  addEditBoxVisible: state.strategySettings.addEditBoxVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategySettingsView)
