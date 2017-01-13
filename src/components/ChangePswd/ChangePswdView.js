import React, { Component } from 'react'
import { API } from 'CONSTANT/globals'
import handleChange from 'UTIL/handleChange'

export default class ChangePswdView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      oldPswd: '',
      newPswd: '',
      newAgainPswd: ''
    }
    this.handleChange = handleChange.bind(this)
  }

  onClose() {
    this.props.updateChangePasswordVisible(false)
  }

  componentWillMount() {
    // console.log(this.props.router)
  }

  render() {
    const { oldPswd, newPswd, newAgainPswd } = this.state
    return (
      <div className="app-modalBox-mask">
        <div className="app-modalBox">
          <div className="title">修改密码</div>
          <div className="content">
            <div className="app-form-item">
              <div className="label req">请输入旧密码：</div>
              <div className="app-input">
                <input 
                  type="password" 
                  value={oldPswd}
                  name="oldPswd"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="app-form-item">
              <div className="label req">请输入新密码：</div>
              <div className="app-input">
                <input 
                  type="password" 
                  value={newPswd}
                  name="newPswd"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="app-form-item">
              <div className="label req">请再次输入新密码：</div>
              <div className="app-input">
                <input 
                  type="password" 
                  value={newAgainPswd}
                  name="newAgainPswd"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="app-double-btn">
            <button className="app-btn">返回</button>
            <button className="app-btn warn">保存</button>
          </div>
          <i className="close" onClick={(e) => this.onClose(e)}></i>
        </div>
      </div>
    )
  }

}