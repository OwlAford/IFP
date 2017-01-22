import React, { Component } from 'react'
import Header from '../Header'
import NProgress from 'nprogress'

export default class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  } 

  componentWillMount() {
    this.props.initUserForm()
    NProgress.start()
    this.props.initUserMenu(() => {
      NProgress.done()
      this.setState({
        loaded: true
      })
    })
  }

  render() {
    // 若数据未准备好，则放弃渲染，以免报错
    if (!this.state.loaded) {
      return false
    }
    const { router, children } = this.props
    return (
      <div className="app-main">
        <Header router={router}/>
        <div className="app-content">
          { children }
        </div>
      </div>        
    )
  }
}