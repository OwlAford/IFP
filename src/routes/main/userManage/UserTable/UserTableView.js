import React, { Component } from 'react'
import { Table } from 'antd'
import AU from 'UTIL/auth'

export default class UserTableView extends Component {

  render() {
    const { userMenu, dataSource } = this.props

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
            item: 'F002', button: (<a title='修改'>修改</a>)
          }, {
            item: 'F004', button: (<a title='删除'>删除</a>)
          }, {
            item: 'F003', button: (<a title='查看'>查看</a>)
          }, {
            item: 'F009', button: (<a title='绑定角色'>绑定角色</a>)
          }]
          return AU.handleItem(this.props.userMenu, buttonList)
        }
      }
    ]

    return (
      <div className="userQuery" style={{padding: '0 20px'}}>
        <Table columns={columns} dataSource={dataSource} bordered/>
      </div>
    )
  }

}