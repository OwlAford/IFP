import React, { Component } from 'react'
import { Row, Col, Button, Table } from 'antd'
import AU from 'UTIL/auth'


export default class StrategySettingsView extends Component {

  constructor(props) {
    super(props)
  }

  addPolicy() {
    console.log('新增策略')
  }

  modStrategy(info) {
    console.log(info)
  } 

  delStrategy(info) {
    console.log(info)
  } 

  componentWillMount() {
    this.props.getStrategyList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const { userMenu, strategyList, getStrategyList, totalNum, strategyListSelOpt } = this.props
    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        icon="plus-circle-o"
        onClick={(e) => this.addPolicy()}
      >
        新增策略
      </Button>
    )

    const columns = [{
      title: '策略编号',
      dataIndex: 'authId',
      key: 'authId'
    }, {
      title: '策略名称',
      dataIndex: 'alias',
      key: 'alias'
    }, {
      title: '授权方式',
      dataIndex: 'authType',
      key: 'authType',
      render: (text, record) => {
        return text == '0' || text == 0 ? <span>无序</span> : <span>有序</span>
      }
    }, {
      title: '授权定义',
      children: [{
        title: '一级',
        dataIndex: 'add1',
        key: 'add1'
      }, {
        title: '二级',
        dataIndex: 'add2',
        key: 'add2'
      }, {
        title: '三级',
        dataIndex: 'add3',
        key: 'ad3'
      }, {
        title: '四级',
        dataIndex: 'add4',
        key: 'add4'
      }, {
        title: '五级',
        dataIndex: 'add5',
        key: 'add5'
      }]
    }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          const buttonList = [{
            item: 'F002',
            button: <a onClick={e => {this.modStrategy(record)}}>修改</a>
          }, {
            item: 'F004', 
            button: <a onClick={e => {this.delStrategy(record)}}>删除</a>
          }]
          return AU.handleItem(userMenu, buttonList)
        }
      }]

    const pagination = {
      total: Number(totalNum),
      current: Number(strategyListSelOpt.currentPage),
      showSizeChanger: true,
      pageSize: Number(strategyListSelOpt.turnPageShowNum),
      onShowSizeChange: (current, pageSize) => {
        getStrategyList({
          currentPage: 1,
          turnPageShowNum: pageSize,
          bsnName: strategyListSelOpt.bsnName
        })
      },
      onChange: (current) => {
        getStrategyList({
          currentPage: current,
          turnPageShowNum: strategyListSelOpt.turnPageShowNum,
          bsnName: strategyListSelOpt.bsnName
        })
      }
    }

    return (
      <div className="pagePolicySettings">
        <div style={{padding: '20px 30px', textAlign: 'right'}}>
          {AU.checkButton(userMenu, 'F001', addBtn)}
        </div>
        <div className='app-narrow-table' style={{ padding: '0 30px' }}>
          <Table
            rowKey='authId'
            bordered
            columns={columns}
            dataSource={strategyList}
            pagination={pagination}
          />
        </div>
        </div>
    )
  }

}