import React, { Component } from 'react'
import { Table, Button, Row, Col, Modal } from 'antd'
import Spin from 'COMPONENT/Spin'


export default class BindRoleBoxView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onClose() {
    this.props.setBindRoleBoxVisible(false)
  }

  onSubmit() {

  }

  render() {
    const { visible } = this.props
    return (
      <div className="BindRoleBox">
        <Modal
          title="关联功能"
          width={600}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
              <Button 
                key="back" 
                type="ghost" 
                size="large" 
                onClick={(e) => this.onClose()}
              >
                返 回
              </Button>,
              <Button 
                key="submit" 
                type="primary" 
                size="large"  
                onClick={(e) => this.onSubmit()} 
              >
                提 交
              </Button>
            ]}
          >
            111111111111
            <Spin loading={this.state.loading}/>
          </Modal>
      </div>
    )
  }
}
