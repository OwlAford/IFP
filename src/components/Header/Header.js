import React, { Component } from 'react'
import { Link } from 'react-router'
import { API } from 'CONSTANT/globals'
import Account from '../Account'
import Sidebar from '../Sidebar'
import './Header.scss'

export default class HeaderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMenus: {},
      currentUrl: ''
    }
  } 

  handleMenu(index) {
    this.setState({
      currentMenus: this.props.items[index].menus[0],
      currentUrl: this.props.items[index].url
    })
  }

  componentWillMount () {
    this.setState({
      currentMenus: this.props.items[0].menus[0],
      currentUrl: this.props.items[0].url
    })
  }

  render() {

    const LnkList = (params) => {
      return (
        <div className="guide">
        {params.map(
          (item, i) => {
            return (
              <Link 
                key={i}
                to={API.CONTENTNAME + '/' + item.url} 
                activeClassName='active' 
                onClick={(e) => this.handleMenu(i)}
              >
                {item.title}
              </Link>
            ) 
          }
        )}
        </div>
      )
    }

    return (
      <div className="app-header">
        <div className="logo">IFP内部管理系统</div>
        {LnkList(this.props.items)}
        <Sidebar menus={this.state.currentMenus} parentUrl={this.state.currentUrl}/>
        <Account router={this.props.router}/>
      </div>     
    )
  }
}