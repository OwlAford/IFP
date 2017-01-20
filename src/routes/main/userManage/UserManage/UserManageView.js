import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NProgress from 'nprogress'
import BranchTree from 'COMPONENT/BranchTree'
import BranchSearch from '../BranchSearch'
import UserQuery from '../UserQuery'
import UserTable from '../UserTable'
import 'STYLE/pages/userManage.scss'

export default class UserManageView extends Component {

  constructor(props) {
    super(props)
    this.branchSelected = this.branchSelected.bind(this)
  } 

  componentWillMount() {
    // 初始化银行机构列表
    NProgress.start()
    this.props.initBranchList(() => {
      NProgress.done()
      this.setState({
        loaded: true
      })
    })
  }

  branchSelected(info) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: info.brhId,
      brhName: info.title
    })
  }

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    const { branchList } = this.props

    return (
      <div className="pageUserManage">
        <Row>
          <Col span={5}>
            <div className="leftSide">
              <BranchSearch/>
              <BranchTree
                selected={this.branchSelected}
                branchList={branchList}
              />
            </div>
          </Col>
          <Col span={19}>
            <UserQuery/>
            <UserTable/>
          </Col>
        </Row>
      </div>
    )
  }

}