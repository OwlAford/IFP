import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import NProgress from 'nprogress'
import BranchTree from '../BranchTree'
import BranchSearch from '../BranchSearch'
import BranchScan from '../BranchScan'
import 'STYLE/pages/branchManage.scss'

export default class BranchManageView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loaded: true
    }
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

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    // 若数据未准备好，则放弃渲染，以免报错
    if (!this.state.loaded) {
      return false
    }
    return (
      <div className="branchManage">
        <Row>
          <Col span={5}>
            <BranchTree/>
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