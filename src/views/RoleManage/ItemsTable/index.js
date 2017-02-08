import { connect } from 'react-redux'
import { getAllRoleFnItems, clearTableItems } from 'REDUCER/roleManage'
import ItemsTableView from './ItemsTableView'

const mapDispatchToProps = {
  getAllRoleFnItems,
  clearTableItems
}

const mapStateToProps = state => ({
  pageSize: state.roleManage.pageSize,
  totalSize: state.roleManage.tableTotalSize,
  curPage: state.roleManage.tableCurPage,
  dataSource: state.roleManage.tableCurPageItems,
  curRoleId: state.roleManage.curRoleInfo.roleId
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTableView)