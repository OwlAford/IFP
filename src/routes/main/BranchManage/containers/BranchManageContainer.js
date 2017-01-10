import { connect } from 'react-redux'
import { increment, doubleAsync, logtime } from 'REDUCER/branchManage'
import BranchManageView from '../components/BranchManageView'

const mapDispatchToProps = {
  increment: () => increment(1),
  logtime: () => logtime(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  branchManage: state.branchManage
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(BranchManageView)
