import { connect } from 'react-redux'
import { getPostList, resetPageState, setPageShowNum, setCurPageState, setAddPostState, setEditPostState, deletePost } from 'REDUCER/postManage'
import PostManageView from './PostManageView'

const mapDispatchToProps = {
  getPostList,
  resetPageState,
  setPageShowNum,
  setCurPageState,
  setAddPostState,
  setEditPostState,
  deletePost
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  postList: state.postManage.postListData.postList,
  turnPageTotalNum: state.postManage.postListData.turnPageTotalNum,
  currentPage: state.postManage.currentPage,
  turnPageShowNum: state.postManage.turnPageShowNum
})

export default connect(mapStateToProps, mapDispatchToProps)(PostManageView)
