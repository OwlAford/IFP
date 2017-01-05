import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, Radio, Card } from 'antd'
const ButtonGroup = Button.Group

export default class MessageView extends Component {

  static propTypes = {
    message     : PropTypes.object.isRequired,
    doubleAsync : PropTypes.func.isRequired,
    logtime     : PropTypes.func.isRequired,
    increment   : PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      invoiceType: '普通发票'
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
    console.log(this.props)
  }

  render() {
    return (
      <div className="content">
        <div className='content-cell'>
          <Row>
            <Col span={6}>
              <span style={{lineHeight: '28px'}}>数字叠加器: {this.props.message.count}</span>
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
              <span style={{lineHeight: '28px'}}>不定增量次数: {this.props.message.time}</span>
            </Col>
            <Col span={4}>
              <Button type="primary" className='fr' onClick={this.props.logtime}>
                生成
              </Button>
            </Col>
          </Row>
        </div>
        <div className='content-cell'>
          <Row>
            <Col span={12}>
              <Radio.Group value={this.state.invoiceType} onChange={this.handleSizeChange}>
                <Radio.Button value="普通发票">普通发票</Radio.Button>
                <Radio.Button value="增值税发票">增值税发票</Radio.Button>
                <Radio.Button value="甲方收据">甲方收据</Radio.Button>
                <Radio.Button value="甲方审批单">甲方审批单</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={12}>
                <span style={{lineHeight: '28px', float: 'right'}}>当前选中发票类型：{this.state.invoiceType}</span>
            </Col>
          </Row>
          <Row style={{padding: '20px 0'}}>
            <Col span={8} style={{ padding: '0 10px' }}>
              <Card title="Card title" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8} style={{ padding: '0 10px' }}>
              <Card title="Card title" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={8} style={{ padding: '0 10px' }}>
              <Card title="Card title" extra={<a href="#">More</a>}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}