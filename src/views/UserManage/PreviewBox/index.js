import { connect } from 'react-redux'
import { closePreviewUser } from 'REDUCER/userManage'
import PreviewBoxView from './PreviewBoxView'

const mapDispatchToProps = {
  closePreviewUser
}

const mapStateToProps = (state) => ({
  visible: state.userManage.previewBox.visible,
  level: state.config.level,
  certType: state.config.certType,
  info: state.userManage.previewBox.info
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(PreviewBoxView)
