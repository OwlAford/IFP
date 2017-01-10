import React, { Component } from 'react'
import Sidebar from 'COMPONENT/Sidebar'
import Header from 'COMPONENT/Header'

export default class Main extends Component {

  render() {
    return (
      <div className="app-main">
        <Header/>
        <Sidebar />
        <div className="app-content">
          { this.props.children }
        </div>
      </div>        
    )
  }
}