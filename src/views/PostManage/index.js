import { connect } from 'react-redux'
import { getPostList, resetPageState, setPageShowNum, setCurPageState } from 'REDUCER/postManage'
import PostManageView from './PostManageView'

const mapDispatchToProps = {
  getPostList,
  resetPageState,
  setPageShowNum,
  setCurPageState
}

const mapStateToProps = state => ({
  userMenu: state.menu.userMenu,
  postList: state.postManage.postListData.postList,
  turnPageTotalNum: state.postManage.postListData.turnPageTotalNum,
  currentPage: state.postManage.currentPage,
  turnPageShowNum: state.postManage.turnPageShowNum
})

export default connect(mapStateToProps, mapDispatchToProps)(PostManageView)
