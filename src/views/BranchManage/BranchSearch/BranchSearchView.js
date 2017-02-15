import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal } from 'antd'
import BranchAdd from '../BranchAdd'
import { checkBtnList } from 'UTIL/authButton'

const FormItem = Form.Item
const Confirm = Modal.confirm

export default class BranchSearchView extends Component {
  
  addBranch() {
    this.props.setAddBranchVisible(true)
  }

  modBranch() {
    let Props = this.props
    if (Props.selectedBranch.brhId) {
      Confirm({
        title: '确认修改这项内容？',
        content: '点击确认修改',
        onOk() {
          Props.changeBranchModify()
        }
      })
    } else {
      message.warning('请先选择一个机构节点！')
    }
  }

  delBranch() {
    let Props = this.props
    if (Props.selectedBranch.brhId) {
      Confirm({
        title: '确认删除这项内容？',
        content: '点击确认删除',
        onOk() {
          Props.changeBranchDelete()
        },
        onCancel() {}
      })
    } else {
      message.warning('请先选择一个机构节点！')
    }
  }

  render() {
    const { userMenu } = this.props
    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        onClick={(e) => this.addBranch()}
      >
        新增机构
      </Button>
    )
    const modBtn = (
      <Button 
        size="large" 
        onClick={(e) => this.modBranch()}
      >
        保存修改
      </Button>
    )
    const delBtn = (
      <Button 
        size="large" 
        type="danger" 
        onClick={(e) => this.delBranch()}
      >
        删除机构
      </Button>
    )

    return (
      <div className="app-search-panel">
        <div className="button-group">
          {checkBtnList(userMenu, [{
            item: 'F002',
            button: modBtn
          }, {
            item: 'F001',
            button: addBtn
          }, {
            item: 'F004',
            button: delBtn
          }], true)}
        </div>
        <BranchAdd/>
      </div>
    )
  }
}
