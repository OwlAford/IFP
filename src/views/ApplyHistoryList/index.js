import { connect } from 'react-redux'
import { getStateList } from 'REDUCER/applyHistoryList'
import ApplyHistoryListView from './ApplyHistoryListView'

const mapDispatchToProps = {
  getStateList
}

const mapStateToProps = state => ({
  stateList: state.applyHistoryList.stateList,
  stateListSelectOpt: state.applyHistoryList.stateListSelectOpt,
  totalNum: state.applyHistoryList.stateListTotalNum
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyHistoryListView)
