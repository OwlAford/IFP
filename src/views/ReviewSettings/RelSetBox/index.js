import { connect } from 'react-redux'
import { getStrategyList, setRelation } from 'REDUCER/reviewSettings'
import RelSetBoxView from './RelSetBoxView'

const mapDispatchToProps = {
  getStrategyList,
  setRelation
}

const mapStateToProps = state => ({
  strategyList: state.reviewSettings.strategyList,
  bsnSelectOpt: state.reviewSettings.bsnSelectOpt,
  strategyListSelOpt: state.reviewSettings.strategyListSelOpt,
  totalNum: state.reviewSettings.strategyListTotalNum
})

export default connect(mapStateToProps, mapDispatchToProps)(RelSetBoxView)

