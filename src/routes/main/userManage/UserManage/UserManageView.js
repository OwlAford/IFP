import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NProgress from 'nprogress'
import BranchTree from 'COMPONENT/BranchTree'
import InputSearch from 'COMPONENT/InputSearch'
import UserQuery from '../UserQuery'
import UserTable from '../UserTable'

export default class UserManageView extends Component {

  constructor(props) {
    super(props)
    this.branchSelected = this.branchSelected.bind(this)
    this.onSearch = this.onSearch.bind(this)
  } 

  componentWillMount() {
    // 初始化银行机构列表
    NProgress.start()
    this.props.initBranchList(() => {
      NProgress.done()
      this.setState({
        loaded: true
      })
    })
  }

  branchSelected(info) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: info.brhId,
      brhName: info.title
    })
  }

  onSearch(keyword) {
    const { userPageByBrh } = this.props
    userPageByBrh({
      currentPage: '1',
      brhId: '',
      brhName: keyword
    })
  }

  componentWillUnmount() {
    NProgress.done()
  }

  render() {
    const { branchList } = this.props
    const sideStyle = {
      style: {height: '100%'}
    }
    return (
      <div className="pageUserManage">
        <Row {...sideStyle}>
          <Col span={5} {...sideStyle}>
            <div className="app-left-side">
              <InputSearch
                placeholder='请输入搜索机构名称'
                initialValue=''
                onSearch={this.onSearch}
              />
              <BranchTree
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