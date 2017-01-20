import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, Select, DatePicker } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Option = Select.Option

let UserQuery = class UserQueryView extends Component {

  constructor(props) {
    super(props)
    this.disabledEndDate = this.disabledEndDate.bind(this)
    this.disabledStartDate = this.disabledStartDate.bind(this)
  } 

  disabledEndDate(endTime) {
    const beginTime = this.props.form.getFieldsValue().beginTime
    if (!endTime || !beginTime) {
      return false
    }
    return endTime.valueOf() <= beginTime.valueOf()
  }

  disabledStartDate(beginTime) {
    const endTime = this.props.form.getFieldsValue().endTime
    if (!beginTime || !endTime) {
      return false
    }
    return beginTime.valueOf() >= endTime.valueOf()
  }

  handleClear() {
    this.props.form.resetFields()
  }

  searchUser() {
    const { form, userPageByBrh } = this.props
    let filter = form.getFieldsValue()
    userPageByBrh({
      curPage: '1',
      brhId: '',
      ...filter
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    const addUserBtn = (
      <Button 
        size="large" 
        type="primary" 
        onClick={(e) => this.AddUser()}
      >
        新增用户
      </Button>
    )

    const { getFieldDecorator } = this.props.form

    return (
      <div className="app-search-panel">
        <Form horizontal>
          <Row>
            <Col span={9}>
              <FormItem 
                label='用户编号：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userNo', {
                    initialValue: ''
                  })(
                    <Input 
                      placeholder='请输入用户编号' 
                      size='large' 
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={15}>
              <FormItem 
                label='用户名称：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userName', {
                    initialValue: ''
                  })(
                    <Input 
                      placeholder='请输入用户名称' 
                      size='large' 
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={9}>
              <FormItem 
                label='用户级别：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userLevel', {
                    initialValue: ''
                  })(
                    <Select 
                      placeholder='请选择用户级别' 
                      allowClear
                    >
                      <Option value='1'>一级</Option>
                      <Option value='2'>二级</Option>
                      <Option value='3'>三级</Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={15}>
              <FormItem 
                label='创建日期：'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                {
                  getFieldDecorator('beginTime', {
                    initialValue: ''
                  })(
                    <DatePicker
                      style={{marginRight: '10px'}}
                      placeholder='请选择开始日期' 
                      disabledDate={this.disabledStartDate}
                    />
                  )
                }
                {
                  getFieldDecorator('endTime', {
                    initialValue: ''
                  })(
                    <DatePicker
                      placeholder='请选择结束日期' 
                      disabledDate={this.disabledEndDate}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Row>  
        </Form>
        <div className="button-group">
          <Button 
            size="large" 
            onClick={(e) => this.searchUser()}
          >
            搜索用户
          </Button>
          <Button 
            size="large" 
            type="ghost" 
            onClick={(e) => this.handleClear()}
          >
            清除条件
          </Button>
          {AU.checkButton(this.props.userMenu, 'F001', addUserBtn)}
        </div>
      </div>
    )
  }

}

export default Form.create()(UserQuery)