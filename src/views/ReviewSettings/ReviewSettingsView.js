import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'antd'
import InputSearch from 'COMPONENT/InputSearch'
import AU from 'UTIL/auth'


export default class ReviewSettingsView extends Component {

  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
  }

  initTable() {
    this.props.getBsnList({
      currentPage: 1,
      turnPageShowNum: 10,
      bsnName: ''
    })
  } 

  componentWillMount() {
    this.initTable()
  }

  onSearch(bsnName) {
    const { getBsnList, bsnSelectOpt } = this.props
    getBsnList({
      currentPage: 1,
      turnPageShowNum: bsnSelectOpt.turnPageShowNum,
      bsnName: bsnName
    })
  }

  render() {
    const { userMenu, bsnList, getBsnList, bsnListTotalNum, bsnSelectOpt } = this.props

    const columns = [{
      title: '交易编号',
      dataIndex: 'bsnCode',
      key: 'bsnCode'
    }, {
      title: '接口编号',
      dataIndex: 'tranCode',
      key: 'tranCode'
    }, {
      title: '交易名称',
      dataIndex: 'bsnName',
      key: 'bsnName'
    }, {
      title: '关联策略名称',
      dataIndex: 'alias',
      key: 'alias',
      render: (text, record) => {
        return <a>{text}</a>
      }
    }, {
      title: '关联策略设置',
      key: 'relation',
      render: (text, record) => {
        const buttonList = [{
          item: 'F009', 
          button: <a>设置</a>
        }]
        return AU.handleItem(userMenu, buttonList)
      }
    }]

    const pagination = {
      total: Number(bsnListTotalNum),
      current: Number(bsnSelectOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(bsnSelectOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getBsnList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          bsnName: bsnSelectOpt.bsnName
        })
      },
      onChange: (current) => {
        getBsnList({
          currentPage: current,
          turnPageShowNum: bsnSelectOpt.turnPageShowNum,
          bsnName: bsnSelectOpt.bsnName
        })
      }
    }

    return (
      <div className="pageReviewSettings">
        <div style={{ padding: '20px 30px', height: '72px' }}>
          <Button onClick={ e => this.initTable() }>重置</Button>
          <div style={{ float: 'right' }}>
            <InputSearch
              placeholder='请输入交易名称'
              initialValue=''
              onSearch={this.onSearch}
            />
          </div>
        </div>
        <div style={{ padding: '0 30px' }}>
          <Table 
            rowKey='tranCode'
            columns={columns} 
            dataSource={bsnList} 
            pagination={pagination} 
            bordered
          />
        </div>
      </div>
    )
  }

}