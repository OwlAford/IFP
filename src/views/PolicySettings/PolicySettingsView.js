import React, { Component } from 'react'
import { Row, Col } from 'antd'



export default class PolicySettingsView extends Component {

  constructor(props) {
    super(props)

  } 

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { name } = this.props
    return (
      <div className="pagePolicySettings">
        {name}
      </div>
    )
  }

}