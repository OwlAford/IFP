import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'antd'

export default class BranchManageView extends Component {

  static propTypes = {
    branchManage : PropTypes.object.isRequired,
    doubleAsync  : PropTypes.func.isRequired,
    logtime      : PropTypes.func.isRequired,
    increment    : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false
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
    // console.log(this.props)
  }

  render() {
    return (
      <div className="branchManage">
        <div>
          <Row>
            <Col span={6}>
              <span style={{lineHeight: '28px'}}>数字叠加器: {this.props.branchManage.count}</span>
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={this.props.increment} className='mr10'>
                单次加一
              </Button>
              <Button type="primary" loading={this.state.loading} onClick={e => this.enterLoading(e)}>
                延时异步双倍叠加
              </Button>
            </Col>
            <Col span={6}>
              <span style={{lineHeight: '28px'}}>不定增量次数: {this.props.branchManage.time}</span>
            </Col>
            <Col span={4}>
              <Button type="primary" className='fr' onClick={this.props.logtime}>
                生成
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}