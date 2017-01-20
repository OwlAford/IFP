import React, { Component } from 'react'
import { Form, Button, Input, Icon } from 'antd'
const FormItem = Form.Item

let BranchSearch = class BranchSearchView extends Component {

  onSubmit() {
    const { userPageByBrh, form } = this.props
    let data = Object.assign({
    }, {
      currentPage: '1'
    }, {
      brhId: ''
    }, {
      brhName: form.getFieldsValue().brhName
    })
    userPageByBrh(data)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="branchSearch">
        <Form inline>
          <FormItem>
            {getFieldDecorator('brhName', {
              initialValue: ''
            })(
              <Input 
                addonAfter={
                  <Icon type="search" onClick={(e) => this.onSubmit()}/>
                } 
                placeholder='请输入机构名称'
              />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(BranchSearch)