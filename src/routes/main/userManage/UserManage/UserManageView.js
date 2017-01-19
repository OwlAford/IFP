import React, { Component } from 'react'
import { Row, Col } from 'antd'
import BranchTree from '../BranchTree'
import BranchSearch from '../BranchSearch'
import UserQuery from '../UserQuery'
import UserTable from '../UserTable'
import 'STYLE/pages/userManage.scss'

export default class UserManageView extends Component {

  render() {
    return (
      <div className="pageUserManage">
        <Row>
          <Col span={5}>
            <BranchSearch/>
            <BranchTree/>
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