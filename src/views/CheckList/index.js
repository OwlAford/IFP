import { connect } from 'react-redux'
import { getCheckList } from 'REDUCER/checkList'
import CheckListView from './CheckListView'

const mapDispatchToProps = {
  getCheckList
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  checkList: state.checkList.checkList,
  checkListSelectOpt: state.checkList.checkListSelectOpt,
  totalNum: state.checkList.checkListTotalNum,
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckListView)
