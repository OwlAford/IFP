import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, TreeSelect, Select } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let EditRole = class EditRoleView extends Component {

  constructor(props) {
    super(props)
  } 

  handleClear() {
    this.props.form.resetFields()
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }

    const onChange = (value) => {
      console.log(value)
    }

    const { form, treeNodes, info } = this.props
    const { getFieldDecorator } = form

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,      
      onChange: onChange,      
      value: info.selectModifyRole,     
      placeholder: '请选择所属角色',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className="app-search-panel">
        <Form horizontal>
          <Row>
            <Col span={11}>
              <FormItem 
                label='角色名：'
                {...formItemLayout}
                required
              >
                {
                  getFieldDecorator('roleName', {
                    initialValue: info.roleName,
                    rules: [
                      {
                        required: true, 
                        message: '请输入角色名'
                      }
                    ]
                  })(
                    <Input 
                      placeholder='请输入角色名' 
                      size='large' 
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='状态：'
                {...formItemLayout}
                required
              >
                {
                  getFieldDecorator('roleStatus', {
                    initialValue: info.roleStatus
                  })(
                    <Select 
                      placeholder='请选择状态' 
                      allowClear
                    >
                      <Option value='1'>可用</Option>
                      <Option value='0'>禁用</Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>

            <Col span={13}>
              <FormItem 
                label='角色描述：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('roleDesc', {
                    initialValue: info.roleDesc
                  })(
                    <Input 
                      placeholder='请输入角色描述' 
                      size='large' 
                    />
                  )
                }
              </FormItem>
              <FormItem 
                label='所属角色：'
                {...formItemLayout}
              >
                <TreeSelect 
                  {...treeProps} 
                  allowClear
                >
                </TreeSelect>
              </FormItem>
            </Col>
          </Row>
          <div className="button-group">
            <Button 
              size="large" 
              onClick={(e) => this.searchUser()}
            >
              修改角色
            </Button>
            <Button 
              size="large" 
              onClick={(e) => this.searchUser()}
            >
              关联功能
            </Button>
            <Button 
              size="large" 
              onClick={(e) => this.handleClear()}
            >
              添加角色
            </Button>
            <Button 
              size="large" 
              type="primary" 
              onClick={(e) => this.handleClear()}
            >
              删除角色
            </Button>
          </div>  
        </Form>
      </div>  
    )
  }

}

export default Form.create()(EditRole)