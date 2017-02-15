import React, { Component } from 'react'
import { Button, Table } from 'antd'
import AU from 'UTIL/auth'

export default class CheckListView extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCheckList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const { userMenu, getCheckList, checkList, checkListSelectOpt, totalNum } = this.props

    const columns = [{
      title: '审批流水号',
      dataIndex: 'flowId',
      key: 'flowId'
    }, {
      title: '交易编号',
      dataIndex: 'bsnCode',
      key: 'bsnCode'
    }, {
      title: '交易名称',
      dataIndex: 'bsnName',
      key: 'bsnName',
      render: (text, record) => {
        return <a onClick={e => {this.checkReview(record)}}>{text}</a>
      }
    }, {
      title: '申请人编号',
      dataIndex: 'applicantId',
      key: 'applicantId'
    }, {
      title: '申请人姓名',
      dataIndex: 'applicantName',
      key: 'applicantName'
    }, {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate'
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        const buttonList = [{
          item: 'F006',
          button: <a onClick={e => {this.checkAgree(record)}}>同意</a>
        }, {
          item: 'F006', 
          button: <a onClick={e => {this.checkReject(record)}}>驳回</a>
        }]
        return AU.handleItem(userMenu, buttonList)
      }
    }]

    const pagination = {
      total: Number(totalNum),
      current: Number(checkListSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(checkListSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getCheckList({
          currentPage: 1,
          turnPageShowNum: pageSize
        })
      },
      onChange: (current) => {
        getCheckList({
          currentPage: current,
          turnPageShowNum: checkListSelectOpt.turnPageShowNum
        })
      }
    }

    return (
      <div className="pageCheckList" style={{ padding: '20px 30px' }}>
        <Table
          bordered
          columns={columns}
          dataSource={checkList}
          pagination={pagination}
        />
      </div>
    )
  }

}