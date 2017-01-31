import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NProgress from 'nprogress'
import InputSearch from 'COMPONENT/InputSearch'
import RoleTree from 'COMPONENT/RoleTree'
import ModifyRole from './ModifyRole'
import AddBindRole from './AddBindRole'


export default class RoleManageView extends Component {

  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
  } 

  onSearch(keyword) {
    console.log(keyword)
  }

  roleSelected(info) {
    console.log(info)
  }

  componentWillMount() {
    this.props.getRoleTree()
  }

  componentWillUnmount() {

  }

  render() {
    const { getRoleTree, roleList } = this.props
    return (
      <div className="pageRoleManage">
        <Row>
          <Col span={5}>
            <div className="app-left-side">
              <InputSearch
                placeholder='请输入角色名称'
                initialValue=''
                onSearch={this.onSearch}
              />
              <RoleTree
                selected={this.roleSelected}
                roleList={roleList}
              />
            </div>
          </Col>
          <Col span={19}>
            <div className="app-search-panel">
              <Row>
                <Col span={11}>
                  <AddBindRole/>
                </Col>
                <Col span={13}>
                  <ModifyRole/>
                </Col>
              </Row>  
            </div>
            新增角色管理页面
          </Col>
        </Row>
      </div>
    )
  }

}