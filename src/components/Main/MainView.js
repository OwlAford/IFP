import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

export default class MainView extends Component {

  componentWillMount () {
    this.props.initUserMenu()
    // console.log(this.props.main)
  }

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