import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, Select, DatePicker } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Option = Select.Option

let AddBindRole = class AddBindRoleView extends Component {

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

    const { form } = this.props
    const { getFieldDecorator } = form


    return (
      <Form horizontal>
        <FormItem 
          label='角色名：'
          {...formItemLayout}
          required
        >
          {
            getFieldDecorator('userNo', {
              initialValue: '',
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
            getFieldDecorator('userLevel')(
              <Select 
                placeholder='请选择状态' 
                allowClear
              >
                <Option value={'true'} key='00001'>可用</Option>
                <Option value={'false'} key='00000'>禁用</Option>
              </Select>
            )
          }
        </FormItem>
        <div className="button-group-middle">
          <Button 
            size="large" 
            onClick={(e) => this.searchUser()}
          >
            修改
          </Button>
          <Button 
            size="large" 
            type="primary" 
            onClick={(e) => this.handleClear()}
          >
            删除
          </Button>
        </div>
      </Form>
    )
  }

}

export default Form.create()(AddBindRole)