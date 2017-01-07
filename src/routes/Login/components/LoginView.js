import React, { Component, PropTypes } from 'react'
import { Input, Icon, Row, Col, Button } from 'antd'
import { Link } from 'react-router'
import { API } from 'CONSTANT/globals'
import handleChange from 'UTIL/handleChange'
import 'STYLE/login.scss'

export default class LoginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: 'false',
      userName: '',
      pswd: '',
      vcode: '',
    }
    this.handleChange = handleChange.bind(this)
    this.reloadCode = this.reloadCode.bind(this)
  }

  emitEmptyName = () => {
    this.userNameInput.focus()
    this.setState({ userName: '' })
  }

  emitEmptyPswd = () => {
    this.pswdInput.focus()
    this.setState({ pswd: '' })
  }

  reloadCode() {
    this.props.setSessionID()
  }

  componentWillMount() {
    this.reloadCode()
  }

  handleSubmit() {
    const showHome = () => {
      this.props.router.push(API.CONTENTNAME + '/' + window.globalConfig.HOME_PATH)
    }
    this.props.validateLogin(this.state, showHome)
  }

  render() {
    const { userName, pswd, vcode } = this.state
    const suffixName = userName ? <Icon type="close-circle" onClick={this.emitEmptyName} /> : null
    const suffixPswd = pswd ? <Icon type="close-circle" onClick={this.emitEmptyPswd} /> : null
    return (
      <div className="Login">
        <div className="loginBox">
          <div className="row">
            <Input
              placeholder="请输入用户名"
              prefix={<Icon type="user" />}
              suffix={suffixName}
              value={userName}
              name="userName"
              size="large"
              onChange={this.handleChange}
              ref={node => this.userNameInput = node}
            />
          </div>
          <div className="row" style={{marginTop: '15px'}}>
            <Input
              placeholder="请输入密码"
              type="password"
              prefix={<Icon type="lock" />}
              suffix={suffixPswd}
              value={pswd}
              name="pswd"
              size="large"
              onChange={this.handleChange}
              ref={node => this.pswdInput = node}
            />
          </div>
          <div className="row" style={{marginTop: '15px'}}>
            <Row>
              <Col span={18}>
                <Input
                  placeholder="请输入验证码"
                  value={vcode}
                  name="vcode"
                  size="large"
                  onChange={this.handleChange}
                />
              </Col>
              <Col span={4}>
                <img 
                  style={{height: '32px', width: '90px', marginLeft: '10px'}}
                  src={this.props.vcodeSrc} 
                  onClick={this.reloadCode} 
                />
              </Col>
            </Row>
          </div>
          <div className="row" style={{marginTop: '15px', textAlign: 'center'}}>
            <Button type="primary" size="large" onClick={(e) => this.handleSubmit()}>立即登录</Button>
          </div>
        </div>
        <div className='content-cell'>
          <Row>
            <Col span={12}>
              {this.state.userName} ~
              {this.state.pswd} ~
              {this.state.vcode}
              <span style={{lineHeight: '28px'}}>Triple结果: {this.props.count}</span>
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={this.props.triple}>
                点击增加
              </Button>
            </Col>  
            <Col span={4}>  
              <Button type="primary" style={{marginleft: '20px'}}>
                <Link to='/inmanage/message'>下一页</Link>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}