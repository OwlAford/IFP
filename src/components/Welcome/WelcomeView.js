import React, { Component } from 'react'
import './Welcome.scss'

export default class WelcomeView extends Component {

  render () {
  	let main = this.props.main
    return (
      <div className="page-welcome">
        <div className="title">欢迎使用IFP内部管理系统！</div>
        <div className="table">
          <table>
            <tr>
              <td className="label">当前访问IP：</td>
              <td>{main.currentCstIP}</td>
            </tr>
            <tr>
              <td className="label">当前访问时间：</td>
              <td>{main.currentLoginTime}</td>
            </tr>
            <tr>
              <td className="label">最后一次访问IP：</td>
              <td>{main.lastCstIP}</td>
            </tr>
            <tr>
              <td className="label">最后一次登录时间：</td>
              <td>{main.lastLoginTime}</td>
            </tr>
            <tr>
              <td className="label">登录次数：</td>
              <td>{main.loginCount}</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
