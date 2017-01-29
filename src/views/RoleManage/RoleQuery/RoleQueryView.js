import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message, Modal, Select, DatePicker } from 'antd'
import AU from 'UTIL/auth'

const FormItem = Form.Item
const Option = Select.Option

let RoleQuery = class RoleQueryView extends Component {

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
  addUser() {
    this.props.setAddUserBoxVsisible(true)
  }

  searchUser() {
    const { form, userPageByBrh } = this.props
    let filter = form.getFieldsValue()
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      } else {
        const beginTime = fieldsValue['beginTime']
        const endTime = fieldsValue['endTime']
        Object.assign(filter, {
          beginTime: beginTime ? beginTime.format('YYYYMMDD') : '',
          endTime: endTime ? endTime.format('YYYYMMDD') : ''
        })
      }
    })
    userPageByBrh({
      curPage: '1',
      brhId: '',
      ...filter
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 }
    }

    const datePickerConfig = {
      rules: [{ type: 'object'}]
    }

    const addUserBtn = (
      <Button 
        size="large" 
        type="primary" 
        onClick={(e) => this.addUser()}
      >
        新增用户
      </Button>
    )

    const { form, level, userBox } = this.props
    const { getFieldDecorator } = form

    // 用户等级
    const userLevelList = level.map(
      item => <Option value={item.paramKey} key={item.paramKey} >{item.paramValue}</Option>
    )

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
                  type="ghost" 
                  onClick={(e) => this.handleClear()}
                >
                  删除
                </Button>
              </div>
            </Col>
            <Col span={13}>
              <FormItem 
                label='角色描述：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userName', {
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
                {
                  getFieldDecorator('userLevel')(
                    <Select 
                      placeholder='请选择所属角色' 
                      allowClear
                    >
                      {userLevelList}
                    </Select>
                  )
                }
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
                  type="ghost" 
                  onClick={(e) => this.handleClear()}
                >
                  添加角色
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
       </div> 
    )
  }

}

export default Form.create()(RoleQuery)