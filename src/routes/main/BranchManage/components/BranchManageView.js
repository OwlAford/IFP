import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import BranchTree from './BranchTree'
import BranchSearch from './BranchSearch'
import 'STYLE/pages/branchManage.scss'

export default class BranchManageView extends Component {

  componentWillMount () {
    // 初始化银行列表
    this.props.initBranchList()
  }

  render() {
    return (
      <div className="branchManage">
        <Row>
          <Col span={5}>
            <BranchTree
              changeBranchSelected={this.props.changeBranchSelected}
              main={this.props.main}
            />
          </Col>
          <Col span={19}>
            <BranchSearch/>
          </Col>
        </Row>
      </div>
    )
  }

}