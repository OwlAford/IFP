import { connect } from 'react-redux'
import { getCheckList } from 'REDUCER/checkList'
import CheckListView from './CheckListView'

const mapDispatchToProps = {
  getCheckList
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CheckListView)
