import { connect } from 'react-redux'
import { userPageByBrh } from 'REDUCER/userManage'
import BranchSearchView from './BranchSearchView'

const mapDispatchToProps = {
  userPageByBrh
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BranchSearchView)
