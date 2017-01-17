import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Confirm = Modal.confirm

let BranchSearch = class BranchSearch extends Component {
  
  constructor(props) {
    super(props)
  }

  handleSearch() {
    const { validateFields, getFieldsValue } = this.props.form
    const { changeBranchSelected } = this.props
    validateFields(['brhName'], (error, values) => {
      if (!!error) {
        message.error('请填写搜索条件!')
      } else {
        let brhName = getFieldsValue().brhName
        let data = Object.assign({}, {brhId: ''}, {brhName: brhName})
        changeBranchSelected(data)
      }
    })
  }

  handleClear() {
    console.log('handleClear')
    const { resetFields } = this.props.form
    resetFields()
  }

  addBranch() {
    console.log('addBranch')
  }

  modBranch() {
    console.log('modBranch')
    const { modifyVisible, cleanContrclickModify, changeBranchOperationModify } = this.props
    if (modifyVisible) {
      Confirm({
        title: '您是否确认要修改这项内容',
        content: '点确认 1 秒后关闭',
        onOk() {
          return new Promise((resolve) => {
              resolve(changeBranchOperationModify())
              cleanContrclickModify()
              // cleanBranch() // 点击修改后清空新增里的所属机构的选择框
            }
          )
        },
        onCancel() {
          // cleanContrclickModify()
        }
      })
    } else {
      message.warning('请在机构树上先选择一个机构节点！')
    }
  }

  delBranch() {
    console.log('delBranch')
  }

  render() {
    const { getFieldProps } = this.props.form
    const addBtn = (<Button size="large" onClick={(e) => this.addBranch()}>新增</Button>)
    const modBtn = (<Button size="large" onClick={(e) => this.modBranch()}>保存修改</Button>)
    const delBtn = (<Button size="large" onClick={(e) => this.delBranch()}>删除</Button>)

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    return (
      <div className="BranchSearch">
        <Form horizontal>
          <Row style={{height: '56px'}}>
            <Col span={12}>
              <FormItem 
                inline 
                label="搜索机构名称：" 
                {...formItemLayout}
              >
                <Input 
                  placeholder="请输入机构搜索名称"
                  {...getFieldProps('brhName', {
                    rules: [{ 
                      required: true,
                      whitespace: true, 
                      message: ' '
                    }]
                  })}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <div style={{float: 'right'}}>
                <Button 
                  type="primary" 
                  style={{marginRight: '20px'}} 
                  size="large" 
                  onClick={(e) => this.handleSearch()}
                >
                  搜索
                </Button>
                <Button 
                  size="large" 
                  onClick={(e) => this.handleClear()}
                >
                  清除条件
                </Button>
              </div>
            </Col>
          </Row>
          <div className="button-group">
            {AU.checkButton(this.props.userMenu, 'F002', modBtn)}
            {AU.checkButton(this.props.userMenu, 'F001', addBtn)}
            {AU.checkButton(this.props.userMenu, 'F004', delBtn)}
          </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(BranchSearch)