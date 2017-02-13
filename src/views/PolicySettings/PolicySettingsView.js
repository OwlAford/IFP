import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import AU from 'UTIL/auth'


export default class PolicySettingsView extends Component {

  constructor(props) {
    super(props)

  }

  addPolicy() {

  } 

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { userMenu } = this.props
    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        icon="plus-circle-o"
        onClick={(e) => this.addPolicy()}
      >
        新增策略
      </Button>
    )
    return (
      <div className="pagePolicySettings">
        <div style={{padding: '20px 30px', textAlign: 'right'}}>
          {AU.checkButton(userMenu, 'F001', addBtn)}
        </div>
      </div>
    )
  }

}