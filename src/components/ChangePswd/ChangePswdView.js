import React, { Component } from 'react'
import { API } from 'CONSTANT/globals'
import './ChangePswd.scss'

export default class ChangePswdView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
    // console.log(this.props.router)
  }

  render() {
    return (
      <div className="app-changePswd">
        <div className="changePswdBox">
          changePassword
          <i className="close"></i>
        </div>
      </div>
    )
  }

}