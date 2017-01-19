import React, { Component } from 'react'
import { Form, Button, Input, Icon } from 'antd'
const FormItem = Form.Item

let BranchSearch = class BranchSearchView extends Component {

  onSubmit() {
    console.log('搜索')
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
                  <Icon type="search" onClick={(e) => this.onSubmit()} />
                } 
                placeholder='输入机构名'
              />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(BranchSearch)