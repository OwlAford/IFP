import { connect } from 'react-redux'
import { selectMenu } from 'REDUCER/common/menu'
import SidebarView from './SidebarView'

const mapDispatchToProps = {
  selectMenu
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarView)


