import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import './Sidebar.scss'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: [
              {
                active: true,
                title: '测试条目',
                titleIcon: 'organization',
                subList: [
                  {
                    href: '/inmanage/main/message',
                    name: '参考模板'
                  }
                ]
              }, {
                active: false,
                title: '机构管理',
                titleIcon: 'organization',
                subList: [
                  {
                    href: '/inmanage/main/branchManage',
                    name: '机构管理'
                  }
                ]
              }, {
                active: false,
                title: '用户管理',
                titleIcon: 'userManage',
                subList: [
                  {
                    href: '/inmanage/main/userManage',
                    name: '用户管理'
                  }
                ]
              }, {
                active: false,
                title: '角色管理',
                titleIcon: 'roleManage',
                subList: [
                  {
                    href: '/inmanage/main/roleManage',
                    name: '角色管理'
                  }
                ]
              }, {
                active: false,
                title: '岗位管理',
                titleIcon: 'postManage',
                subList: [
                  {
                    href: '/inmanage/main/postManage',
                    name: '岗位管理'
                  }
                ]
              }, {
                active: false,
                title: '策略管理',
                titleIcon: 'strategyManage',
                subList: [
                  {
                    href: '/inmanage/main/reviewSetting',
                    name: '审查设置'
                  }, {
                    href: '/inmanage/main/strategySetting',
                    name: '策略设置'
                  }
                ]
              }, {
                active: false,
                title: '审查管理',
                titleIcon: 'reviewManage',
                subList: [
                  {
                    href: '/inmanage/main/approveList',
                    name: '审批列表'
                  }, {
                    href: '/inmanage/main/approveHistory',
                    name: '审批历史'
                  }, {
                    href: '/inmanage/main/approveRecord',
                    name: '审批记录'
                  }
                ]
              },
            ]
    }
  }

  handleSubActive(e, index) {
    let state = Object.assign({}, this.state)
    let current = state.menu[index].active
    state.menu[index].active = !current
    this.setState(state)
  }

  render() {
    const menuListClass = (index) => {
      return this.state.menu[index].active ? 'menuList active' : 'menuList'
    }

    const titleClass = (index) => {
      return this.state.menu[index].active ? 'title active' : 'title'
    }

    const Title = (name, icon, index) => {
      return (
        <div 
          className={titleClass(index)} 
          onClick={(e) => this.handleSubActive(e, index)}
        >
          <i className={icon}></i>
          {name}
        </div>
      )
    }

    const MenuList = ({ subList, index }) => {
      return (
        <div className={menuListClass(index)}>
          {subList.map(
            (item, i) => {
              return (
                <div key={i} className="item">
                  <Link to={item.href} activeClassName='active'>{item.name}</Link>
                </div>
              ) 
            }
          )}
        </div>
      )
    }

    const SubMenu = ({title, titleIcon, subList}, index) => {
      return (
        <div className="subMenu">
          {Title(title, titleIcon, index)}
          {MenuList({subList: subList, index})}
        </div>
      )
    }

    const Menu = (dataArray) => {
      return (
        <div className="menu">
          {dataArray.map(
            (item, i) => {
              return (
                <div key={i}>
                  {SubMenu(item, i)}
                </div>
              ) 
            }
          )}
        </div>
      )
    }

    return (
      <div className="app-sidebar">
        {Menu(this.state.menu)}
      </div>
    )
  }  
}
