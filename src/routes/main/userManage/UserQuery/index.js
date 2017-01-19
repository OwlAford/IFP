import { connect } from 'react-redux'
import { increment } from 'REDUCER/userManage'
import UserQueryView from './UserQueryView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  userManage: state.userManage
})

export default connect(mapStateToProps, mapDispatchToProps)(UserQueryView)
