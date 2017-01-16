import { connect } from 'react-redux'
import { increment, doubleAsync, logtime, changeBranchSelected } from 'REDUCER/branchManage'
import { initBranchList } from 'REDUCER/main'
import BranchManageView from '../components/BranchManageView'

const mapDispatchToProps = {
  increment: () => increment(1),
  logtime: () => logtime(1),
  doubleAsync,
  changeBranchSelected,
  initBranchList
}

const mapStateToProps = (state) => ({
  branchManage: state.branchManage,
  main: state.main
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
