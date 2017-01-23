import { connect } from 'react-redux'
import { setPreviewBoxVsisible } from 'REDUCER/userManage'
import PreviewBoxView from './PreviewBoxView'

const mapDispatchToProps = {
  setVisible: setPreviewBoxVsisible
}

const mapStateToProps = (state) => ({
  visible: state.userManage.previewBoxVisible,
  level: state.config.level,
  certType: state.config.certType,
  info: state.userManage.previewInfo
})

// 将 mapDispatchToProps 和 mapStateToProps 连接到组件
export default connect(mapStateToProps, mapDispatchToProps)(PreviewBoxView)
