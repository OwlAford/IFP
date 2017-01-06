import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { Menu, Icon, Switch } from 'antd'
import './Sidebar.scss'
const SubMenu = Menu.SubMenu

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'dark',
      current: ''
    }
    // 监听 history 激活对应菜单
    browserHistory.listen(() => {
      this.setActiveMenu()
    })
  }

  changeTheme(value) {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }

  setActiveMenu () {
    let key = browserHistory.getCurrentLocation().pathname.split('/')[2]
    let current = 'home'
    key ? current = key : null
    this.setState({
      current: current
    })
  }

  componentDidMount () {
    this.setActiveMenu()
  }

  render() {
    return (
      <div className={this.state.theme === 'dark' ? 'sidebar' : 'sidebar light'}>
        <div className="switchTheme">
        <span className='title'>主题切换</span>
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={e => this.changeTheme(e)}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
        <Menu
          theme={this.state.theme}
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub2" title={<span><Icon type="team" /><span>用户中心</span></span>}>
            <Menu.Item key="message">
              <IndexLink to='/inmanage/message'>message</IndexLink>
            </Menu.Item>
            <Menu.Item key="review">
              <IndexLink to='/inmanage/review'>review</IndexLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }  
}
