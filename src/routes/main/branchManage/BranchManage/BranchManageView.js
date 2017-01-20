import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import NProgress from 'nprogress'
import BranchTree from 'COMPONENT/BranchTree'
import BranchSearch from '../BranchSearch'
import BranchScan from '../BranchScan'
import 'STYLE/pages/branchManage.scss'

export default class BranchManageView extends Component {

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

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    const { changeBranchSelected, branchList } = this.props

    return (
      <div className="pageBranchManage">
        <Row>
          <Col span={5}>
            <BranchTree
              selected={changeBranchSelected}
              branchList={branchList}
            />
          </Col>
          <Col span={19}>
            <BranchSearch/>
            <BranchScan/>
          </Col>
        </Row>
      </div>
    )
  }

}