import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, Select, TreeSelect, message, Modal } from 'antd'
import NProgress from 'nprogress'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let BranchAdd = class BranchAdd extends Component {
  
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.form.resetFields()
  }

  onClose() {
    this.props.setBoxVisible(false)
  }

  onClear() {
    this.props.cleanBranch()
    this.props.form.resetFields()
  }

  onSubmit() {
    const { getFieldsValue, validateFields, resetFields } = this.props.form
    const { selectBranchId, branchList, branchOperationAdd } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        message.error('填写内容有错误，请仔细填写!')
      } else {
        let params = getFieldsValue()
        let level = ''
        switch(params.brhLevel) {
          case '等级1':
            level = '1'
            break
          case '等级2':
            level = '2'
            break
          case '等级3':
            level = '3'  
            break
        }

        let brhPName = ''
        branchList.map(item => {
          if (selectBranchId && item.brhId == selectBranchId) {
            brhPName = item.brhName
          }
        })

        let data = Object.assign(
          {}, 
          getFieldsValue(), 
          {brhLevel: level}, 
          {brhPName: brhPName}, 
          {brhParentId: selectBranchId}
        )

        NProgress.start()
        branchOperationAdd(data, () => {
          NProgress.done()
          this.onClear()
          this.onClose()
        }, NProgress.done)
      }  
    })
  }

  phoneNumberCheck(rule, value, callback) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/ 
    if (!reg.test(value)) { 
      callback('请输入有效的手机号码！')
    } else {
      callback()
    }
  }

  render() {
    const { visible, updateBranch, branchNodes, selectBranchId } = this.props
    const { getFieldProps } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    const onChange = (value) => {
      updateBranch(value)
    }

    // 机构等级选择
    const setOptions = ['等级1', '等级2', '等级3'].map(
      item => <Option key={item} value={item}>{item}</Option>
    )

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: branchNodes,      // 供用户选择的角色下拉列表
      onChange: onChange,         // 改变角色的时候更新value的值
      value: selectBranchId,      // 选中的时候的值传给状态树，然后再提交的时候再做处理
      placeholder: "请选择",
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT
    }

    return (
      <div className="BranchAdd">
        <Modal
          title="增加机构"
          width={600}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
              <Button 
                key="back" 
                type="ghost" 
                size="large" 
                onClick={(e) => this.onClose()}
              >
                返 回
              </Button>,

              <Button 
                key="clean" 
                type="ghost" 
                size="large" 
                onClick={(e) => this.onClear()}
              >
                清除所有
              </Button>,

              <Button 
                key="submit" 
                type="primary" 
                size="large"  
                onClick={(e) => this.onSubmit()} 
              >
                提 交
              </Button>
            ]}
          >
            <Form horizontal>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='机构名称：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    <Input  
                      placeholder='请输入机构' 
                      size='large' 
                      {...getFieldProps('brhName', {
                        initialValue: '',
                        rules: [{
                          required: true, 
                          message: ' '
                        }]
                      })}
                     />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='联系人：'
                    {...formItemLayout}
                    hasFeedback
                  >
                    <Input  
                      placeholder='请填写联系人' 
                      size='large' 
                      {...getFieldProps('brhPerson', {
                        initialValue: ''
                      })}
                     />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='机构等级：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    <Select 
                      placeholder='请选择机构等级'
                      {...getFieldProps('brhLevel', {
                        initialValue: '',
                        rules: [{
                          required: true, 
                          message: ' '
                        }]
                      })}
                    >
                      {setOptions}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='联系电话：'
                    {...formItemLayout}
                    required
                    hasFeedback
                  >
                    <Input  
                      placeholder='请输入联系电话' 
                      size='large' 
                      {...getFieldProps('brhPhone', {
                        initialValue: '',
                        rules: [
                          {
                            required: true, 
                            message: ' '
                          }, {
                            validator: this.phoneNumberCheck
                          }
                        ]
                      })}
                     />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='机构描述：'
                    {...formItemLayout}
                    hasFeedback
                  >
                    <Input  
                      placeholder='请填写机构描述' 
                      size='large' 
                      {...getFieldProps('brhDesc', {
                        initialValue: '',
                      })}
                     />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='地区编号：'
                    {...formItemLayout}
                    hasFeedback
                  >
                    <Input  
                      placeholder='请输入地区编号' 
                      size='large' 
                      {...getFieldProps('brhRegionId', {
                        initialValue: ''
                      })}
                     />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem 
                    label='机构地址：'
                    {...formItemLayout}
                    hasFeedback
                  >
                    <Input  
                      placeholder='请输入机构地址' 
                      size='large' 
                      {...getFieldProps('brhAddress', {
                        initialValue: '',
                      })}
                     />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem 
                    label='所属机构：'
                    {...formItemLayout}
                  >
                    {<TreeSelect 
                      placeholder='请选择所属机构' 
                      {...treeProps}
                      allowClear={true}
                    >
                    </TreeSelect>}
                  </FormItem>
                </Col>
              </Row>    
            </Form>
          </Modal>
      </div>
    )
  }
}

export default Form.create()(BranchAdd)