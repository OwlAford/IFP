import React, { Component, PropTypes } from 'react'
import { HOME_PATH } from 'GLOBAL'
import { message } from 'UTIL/antd'

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
      this.context.router.replace(HOME_PATH)
      clearTimeout(timer)
    }, 2000)
  }

  render () {
    return null
  }
}
