import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/main'
import BranchManageView from './BranchManageView'

const mapDispatchToProps = {
  initBranchList
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
