import React, { Component } from 'react'
import { Table } from 'antd'
import Spin from 'COMPONENT/Spin'
import AU from 'UTIL/auth'
import PreviewBox from '../PreviewBox'

export default class UserTableView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  modify(e) {
    console.log(e)
  }

  preview(data) {
    console.log(data)
    let Props = this.props
    const showSpin = () => {
      this.setState({
        loading: true
      })
    }
    const hideSpin = () => {
      this.setState({
        loading: false
      })
    }
    showSpin()
    Props.getRoleByUser(data.userNo, () => {
      Props.setPreviewBoxVsisible(true)
      hideSpin()
    }, hideSpin)
  }

  bindRole(e) {
    console.log(e)
  }

  delUser(e) {
    console.log(e)
  }

  render() {
    const { userMenu, dataSource, totalSize, pageData, userPageByBrh } = this.props

    const columns = [{
        title: '登录用户',
        dataIndex: 'userLoginName',
        key: 'userLoginName'
      }, {
        title: '用户编号',
        dataIndex: 'userNo',
        key: 'userNo'
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        key: 'userName'
      }, {
        title: '所属机构',
        dataIndex: 'brhName',
        key: 'brhName'
      }, {
        title: '用户级别',
        dataIndex: 'userLevel',
        key: 'userLevel'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return (<span>{text}</span>)
        }
      }, {
        title:'操作',
        key:'operation',
        render: (text, record) => {
          const buttonList = [{
            item: 'F002', button: (<a onClick={e => this.modify(record)}>修改</a>)
          }, {
            item: 'F004', button: (<a onClick={e => this.delUser(record)}>删除</a>)
          }, {
            item: 'F003', button: (<a onClick={e => this.preview(record)}>查看</a>)
          }, {
            item: 'F009', button: (<a onClick={e => this.bindRole(record)}>绑定角色</a>)
          }]
          return AU.handleItem(this.props.userMenu, buttonList)
        }
      }
    ]

    let { currentPage, turnPageShowNum } = pageData
    let pagination = {
      total: Number(totalSize),
      defaultCurrent: 1,
      current: Number(currentPage),
      showSizeChanger: true,
      pageSize: Number(turnPageShowNum),

      onShowSizeChange(current, pageSize) {
        pageData.turnPageShowNum = pageSize
        pageData.currentPage = current
        userPageByBrh(pageData)
      },

      onChange(current) {
        pageData.currentPage = current
        userPageByBrh(pageData)
      }
    }

    return (
      <div className="userQuery" style={{padding: '0 20px'}}>
        <Table columns={columns} dataSource={dataSource} bordered pagination={pagination}/>
        <PreviewBox/>
        <Spin loading={this.state.loading}/>
      </div>
    )
  }

}