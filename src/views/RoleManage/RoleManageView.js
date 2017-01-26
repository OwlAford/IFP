import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NProgress from 'nprogress'


export default class RoleManageView extends Component {

  constructor(props) {
    super(props)

  } 

  componentWillMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    const { branchList } = this.props
    return (
      <div className="pageRoleManage">
        新增角色管理页面
      </div>
    )
  }

}