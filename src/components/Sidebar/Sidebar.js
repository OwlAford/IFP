import React, { Component } from 'react'
import { Link } from 'react-router'
import { API } from 'CONSTANT/globals'
import './Sidebar.scss'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleActive(e) {
    let target = e.target
    let parent = target.parentNode
    if (target.getAttribute('state') == '0') {
      parent.classList.add('active')
      target.setAttribute('state', '1')
    } else {
      parent.classList.remove('active')
      target.setAttribute('state', '0')
    }

    console.log()
  }

  render() {
    const Menu = (menus, preUrl) => {
      return (
        <div className="menu">
          <div className="menu-title"><span>{menus.title}</span></div>
          {menus.menus.map(
            (item, i) => {
              // 若只有单项
              if (item.menus.length == 0) {
                return (
                  <div className="subMenu" key={i}>
                    <div className="title single">
                      <Link to={preUrl + item.url} activeClassName='active'>
                        <i className="organization" id={item.id}></i>
                        {item.title}
                      </Link>
                    </div>
                  </div>
                )
              } else {
                // 若有多项
                return (
                  <div className="subMenu" key={i}>
                    <div className="title arr" state="0" onClick={e => this.handleActive(e)}>
                      <i className="organization" id={item.id}></i>
                      {item.title}
                    </div>
                    <div className="menuList">
                      {
                        item.menus.map(
                          (item, i) => {
                            return (
                              <div className="item" key={i}>
                                <Link to={preUrl + item.url} activeClassName='active'>
                                  {item.title}
                                </Link>
                              </div>
                            )
                          }
                        )
                      }
                    </div>
                  </div>
                )
              }
            }
          )}
        </div>
      )
    }

    let menus = this.props.menus
    let preUrl = API.CONTENTNAME + '/' + this.props.parentUrl

    return (
      <div className="app-sidebar">
        {Menu(this.props.menus, preUrl)}
      </div>
    )
  }  
}
