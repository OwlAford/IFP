import React, { Component } from 'react'
import './Welcome.scss'

export default class WelcomeView extends Component {

  render () {
    let { currentCstIP, currentLoginTime, lastCstIP, lastLoginTime, loginCount } 
        = this.props.main
    return (
      <div className="page-welcome">
        <div className="title">欢迎使用IFP内部管理系统！</div>
        <div className="table">
          <table>
            {
              [{
                label: '当前访问IP：',
                info: currentCstIP
              },{
                label: '当前访问时间：',
                info: currentLoginTime
              },{
                label: '最后一次访问IP：',
                info: lastCstIP
              },{
                label: '最后一次登录时间：',
                info: lastLoginTime
              },{
                label: '登录次数：',
                info: loginCount
              }].map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="label">{item.label}</td>
                    <td>{item.info}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    )
  }
}
