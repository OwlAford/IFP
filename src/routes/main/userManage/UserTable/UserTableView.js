import React, { Component } from 'react'
import { Table } from 'antd'
import AU from 'UTIL/auth'

export default class UserTableView extends Component {

  modify(e) {
    console.log(e)
  }

  render() {
    const { userMenu, dataSource, totalSize, pageData, userPageByBrh } = this.props

    const columns=[{
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
            item: 'F004', button: (<a>删除</a>)
          }, {
            item: 'F003', button: (<a>查看</a>)
          }, {
            item: 'F009', button: (<a>绑定角色</a>)
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
      </div>
    )
  }

}