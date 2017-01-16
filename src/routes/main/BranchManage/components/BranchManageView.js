import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'
import BarnchTree from './BarnchTree'
import 'STYLE/pages/branchManage.scss'

export default class BranchManageView extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSizeChange = (e) => {
    this.setState({ invoiceType: e.target.value })
  }

  enterLoading(e) {
    let self = this
    self.setState({ loading: true })
    self.props.doubleAsync(() => self.setState({ loading: false }))
  }

  componentWillMount () {
    // 初始化银行列表
    this.props.initBranchList()
  }

  render() {
    return (
      <div className="branchManage">
        <Row>
          <Col span={5}>
            <BarnchTree
              changeBranchSelected={this.props.changeBranchSelected}
              main={this.props.main}
            />
          </Col>
          <Col span={19}>
            main
          </Col>
        </Row>
      </div>
    )
  }

}