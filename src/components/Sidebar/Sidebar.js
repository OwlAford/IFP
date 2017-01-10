import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import './Sidebar.scss'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: ''
    }
  }

  render() {
    return (
      <div className="app-sidebar">
        <div className="menu">
          <div className="subMenu">
            <div className="title">机构管理</div>
            <div className="menuList">
              <div className="item">
                <Link to='/inmanage/main/branchManage'  activeClassName='active'>机构管理</Link>
              </div>
            </div>
          </div>
          <div className="subMenu">
            <div className="title">用户中心</div>
            <div className="menuList">
              <div className="item">
                <Link to='/inmanage/main/message' activeClassName='active'>Message</Link>
              </div>
              <div className="item">
                <Link to='/inmanage/main/review' activeClassName='active'>不存在页面</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }  
}
