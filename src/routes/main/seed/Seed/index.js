import { connect } from 'react-redux'
import { increment } from 'REDUCER/seed'
import SeedView from './SeedView'

const mapDispatchToProps = {
  increment
}

const mapStateToProps = (state) => ({
  seed: state.seed
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(SeedView)
