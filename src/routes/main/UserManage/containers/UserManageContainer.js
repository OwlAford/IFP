import { connect } from 'react-redux'
import { increment } from 'REDUCER/userManage'
import UserManageView from '../components/UserManageView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  userManage: state.userManage
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(UserManageView)
