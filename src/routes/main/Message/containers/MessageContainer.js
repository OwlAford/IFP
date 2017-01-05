import { connect } from 'react-redux'
import { increment, doubleAsync, logtime } from 'REDUCER/message'
import MessageView from '../components/MessageView'

const mapDispatchToProps = {
  increment : () => increment(1),
  logtime : () => logtime(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  message : state.message
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(MessageView)
