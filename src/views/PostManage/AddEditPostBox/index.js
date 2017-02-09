import { connect } from 'react-redux'
import { closeAddEditBox, addPostList } from 'REDUCER/postManage'
import AddEditPostBoxView from './AddEditPostBoxView'

const mapDispatchToProps = {
  closeAddEditBox,
  addPostList
}

const mapStateToProps = state => ({
  visible: state.postManage.addEditBoxVisible,
  formType: state.postManage.addEditBoxType,
  initVals: state.postManage.addEditBoxInitVals
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPostBoxView)

