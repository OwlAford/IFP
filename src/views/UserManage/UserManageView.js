import React, { Component } from 'react'
import { Row, Col } from 'antd'
import BranchTree from 'COMPONENT/BranchTree'
import InputSearch from 'COMPONENT/InputSearch'
import UserQuery from './UserQuery'
import UserTable from './UserTable'

export default class UserManageView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
    this.branchSelected = this.branchSelected.bind(this)
    this.onSearch = this.onSearch.bind(this)
  } 

  componentWillMount() {
    // 初始化银行机构列表
    this.props.initBranchList()
  }

  branchSelected(info) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: info.brhId,
      brhName: info.title
    }, () => {
      this.setState({
        selectedKeys: [info.brhId]
      })
    })
  }

  onSearch(brhName) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: '',
      brhName: brhName
    })
    this.setState({
      selectedKeys: []
    })
  }

  componentWillUnmount() {
    this.setState({
      selectedKeys: []
    })
  }

  render() {
    const { branchList } = this.props
    return (
      <div className="pageUserManage">
        <Row>
          <Col span={5}>
            <div className="app-left-side">
              <InputSearch
                placeholder='请输入搜索机构名称'
                initialValue=''
                onSearch={this.onSearch}
              />
              <BranchTree
                selectedKeys={this.state.selectedKeys}
                selected={this.branchSelected}
                branchList={branchList}
              />
            </div>
          </Col>
          <Col span={19}>
            <UserQuery/>
            <UserTable/>
          </Col>
        </Row>
      </div>
    )
  }

}