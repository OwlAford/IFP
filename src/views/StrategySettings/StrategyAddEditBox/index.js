import { connect } from 'react-redux'
import { setAddEditModalVisible, addStrategy, editStrategy } from 'REDUCER/strategySettings'
import StrategyAddEditBoxView from './StrategyAddEditBoxView'

const mapDispatchToProps = {
  setAddEditModalVisible,
  addStrategy,
  editStrategy
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyAddEditBoxView)

