import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, DatePicker, Select, Radio, message, Modal } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const confirm = Modal.confirm

let BranchSearch = class BranchSearch extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    
    return (
      <div className="BranchSearch">
        <Form horizontal>
          <Row>
            <Col span={12}>
              <FormItem 
                inline 
                label="搜索机构名称：" 
                labelCol={{ span: 6 }} 
                wrapperCol={{ span: 8 }}
              >
                <Input 
                  placeholder="请输入机构搜索名称" 
                  /*{...getFieldProps('brhName', {
                    rules:[{ 
                      required: true,
                      whitespace: true, 
                      message: ' '}
                    ]}
                  )}*/
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <div style={{float: 'right'}}>
                <Button type="primary" style={{marginRight: '20px'}} size="large" onClick={this.onSubmit}>搜索</Button>
                <Button size="large" key="clean" onClick={this.onClean}>清除条件</Button>
              </div>
            </Col>
          </Row>
          <div className="button-group">
            <Button size="large" onClick={this.showAddBranch}>新增</Button>
            <Button size="large" onClick={this.modifyfunc}>修改</Button>
            <Button size="large" onClick={this.deletefunc}>删除</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(BranchSearch)