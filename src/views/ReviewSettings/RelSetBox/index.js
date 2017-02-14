import { connect } from 'react-redux'
import { setRelation } from 'REDUCER/reviewSettings'
import { getStrategyList } from 'REDUCER/common/strategy'
import RelSetBoxView from './RelSetBoxView'

const mapDispatchToProps = {
  getStrategyList,
  setRelation
}

const mapStateToProps = state => ({
  strategyList: state.strategy.strategyList,
  strategyListSelOpt: state.strategy.strategyListSelOpt,
  totalNum: state.strategy.strategyListTotalNum
})

export default connect(mapStateToProps, mapDispatchToProps)(RelSetBoxView)
