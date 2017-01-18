import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal } from 'antd'
import BranchAdd from './BranchAdd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Confirm = Modal.confirm

let BranchSearch = class BranchSearch extends Component {
  
  constructor(props) {
    super(props)
  }

  handleSearch() {
    const { validateFields, getFieldsValue } = this.props.form
    const { changeBranchSelected, branchList } = this.props
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
    const { resetFields } = this.props.form
    resetFields()
  }

  addBranch() {
    this.props.setAddBranchVisible(true)
  }

  modBranch() {
    let Props = this.props
    if (Props.modifyVisible) {
      Confirm({
        title: '确认修改这项内容？',
        content: '点击确认修改',
        onOk() {
          Props.changeBranchOperationModify()
          Props.cleanContrclickModify()
        },
        onCancel() {}
      })
    } else {
      message.warning('请在机构树上先选择一个机构节点！')
    }
  }

  delBranch() {
    console.log('delBranch')
    let Props = this.props
    if (Props.deleteVisible) {
      Confirm({
        title: '确认删除这项内容？',
        content: '点击确认删除',
        onOk() {
          Props.cleanContrclickDelete()
          Props.changeBranchOperationDelete()
        },
        onCancel() {}
      })
    } else {
      message.warning('请在机构树上先选择一个机构节点！')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { addBoxVisible, setAddBranchVisible, branchNodes, cleanBranch, selectBranchId, updateBranch, branchList, branchOperationAdd } = this.props
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
                {getFieldDecorator('brhName', {
                  rules: [{ 
                    required: true,
                    whitespace: true, 
                    message: ' '
                  }]
                })(
                  <Input 
                    placeholder="请输入机构搜索名称"
                  />
                )}
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
        <BranchAdd 
          visible={addBoxVisible} 
          cleanBranch={cleanBranch} 
          setBoxVisible={setAddBranchVisible} 
          branchNodes={branchNodes} 
          selectBranchId={selectBranchId} 
          updateBranch={updateBranch} 
          branchList={branchList} 
          branchOperationAdd={branchOperationAdd} 
        />
      </div>
    )
  }
}

export default Form.create()(BranchSearch)