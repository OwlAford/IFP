import { connect } from 'react-redux'
import { setBindRoleBoxVisible, getAllRoleFnItems, clearMenuFnItems, setAllMenuFnSelectKeys } from 'REDUCER/roleManage'
import BindRoleBoxView from './BindRoleBoxView'

const mapDispatchToProps = {
  setBindRoleBoxVisible,
  getAllRoleFnItems,
  clearMenuFnItems,
  setAllMenuFnSelectKeys
}

const mapStateToProps = (state) => ({
  visible: state.roleManage.bindBoxVisible,
  pageSize: state.roleManage.pageSize,
  totalSize: state.roleManage.allMenuTotalSize,
  curPage: state.roleManage.allMenuFnCurPage,
  selectKeys: state.roleManage.allMenuFnSelectKeys,
  dataSource: state.roleManage.allMenuFnCurPageItems,
  curRoleId: state.roleManage.curRoleInfo.roleId
})

export default connect(mapStateToProps, mapDispatchToProps)(BindRoleBoxView)

