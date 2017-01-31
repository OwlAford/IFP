import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, TreeSelect, DatePicker } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let ModifyRole = class ModifyRoleView extends Component {

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

    const { form, treeNodes, selectModifyRole } = this.props
    const { getFieldDecorator } = form

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,      
      onChange: onChange,      
      value: selectModifyRole,     
      placeholder: '请选择所属角色',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <Form horizontal>
        <FormItem 
          label='角色描述：'
          {...formItemLayout}
        >
          {
            getFieldDecorator('roleDesc', {
              initialValue: ''
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
        <div className="button-group-middle">
          <Button 
            size="large" 
            onClick={(e) => this.searchUser()}
          >
            关联功能
          </Button>
          <Button 
            size="large" 
            type="primary" 
            onClick={(e) => this.handleClear()}
          >
            添加角色
          </Button>
        </div>
      </Form>
    )
  }

}

export default Form.create()(ModifyRole)