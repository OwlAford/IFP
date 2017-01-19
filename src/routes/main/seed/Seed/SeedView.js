import React, { Component } from 'react'
import { Button } from 'antd'

export default class SeedView extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    // console.log(this.props)
  }

  render() {
    return (
      <div className="userManage">
        <span>数字: {this.props.seed.count}</span>
        <Button type="primary" onClick={this.props.increment}>
          单次加一
        </Button>
      </div>
    )
  }

}