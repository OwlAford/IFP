import { connect } from 'react-redux'
import { initBranchList } from 'REDUCER/main'
import { changeBranchSelected } from 'REDUCER/branchManage'
import BranchManageView from './BranchManageView'

const mapDispatchToProps = {
  initBranchList,
  changeBranchSelected
}

const mapStateToProps = (state) => ({
  branchList: state.main.userGetBranchList
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
