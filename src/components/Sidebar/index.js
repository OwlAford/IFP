import { connect } from 'react-redux'
import { selectMenu } from 'REDUCER/main'
import SidebarView from './SidebarView'

const mapDispatchToProps = {
  selectMenu
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarView)


