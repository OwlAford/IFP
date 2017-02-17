import { connect } from 'react-redux'
import { getHistoryList } from 'REDUCER/checkHistoryList'
import CheckHistoryListView from './CheckHistoryListView'

const mapDispatchToProps = {
  getHistoryList
}

const mapStateToProps = state => ({
  historyList: state.checkHistoryList.historyList,
  historyListSelectOpt: state.checkHistoryList.historyListSelectOpt,
  totalNum: state.checkHistoryList.historyListTotalNum,
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckHistoryListView)
