import React, { Component } from 'react'
import Sidebar from 'COMPONENT/Sidebar'

export default class Main extends Component {

  render() {
    return (
      <div className="content">
        <Sidebar />
        { this.props.children }
      </div>
    )
  }
}