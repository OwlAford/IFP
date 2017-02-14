import React, { Component, PropTypes } from 'react'
import { CONTENTNAME } from 'GLOBAL'
import { message } from 'antd'

const error = function () {
  message.error('找不到该页面！')
}

export default class NotFound extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    error()
    let timer = setTimeout(() => {
      this.context.router.replace(CONTENTNAME)
      clearTimeout(timer)
    }, 2000)
  }

  render () {
    return null
  }
}
