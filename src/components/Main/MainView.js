import React, { Component } from 'react'
import Header from '../Header'

export default class MainView extends Component {

  componentWillMount () {
    this.props.initUserMenu()
    // console.log(this.props.main.items)
  }

  render() {
    return (
      <div className="app-main">
        <Header router={this.props.router} items={this.props.main.items}/>
        <div className="app-content">
          { this.props.children }
        </div>
      </div>        
    )
  }
}