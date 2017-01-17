import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, DatePicker, Select, Radio, message, Modal, TreeSelect } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let BranchScan = class BranchScan extends Component {

  componentWillUnmount() {
    this.props.resetForm()   // 清空整个表单
    this.props.cleanBranch() // 清空所属机构的选择框
  }

  componentWillReceiveProps() {
    const { resetFields } = this.props.form
    // resetFields()
  }

  render() {
    const { getFieldProps } = this.props.form
    const { selectedBranch, branchNodes, selectBranchId, updateBranch } = this.props

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    }

    const getLevel = () => {
      switch (selectedBranch.brhLevel) {
        case '1':
          return '等级1'
        case '2':
          return '等级2'
        case '3':
          return '等级3'  
      }
    }

    // 机构等级选择
    const setOptions = ['等级1', '等级2', '等级3'].map(
      item => <Option key={item} value={item}>{item}</Option>
    )

    const onChange = (value) => {
      if(selectedBranch.brhId == value) {
        message.warning('不能选择当前机构,请重新选择!')
      } else {
        updateBranch(value)
      }
    }

    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: branchNodes,      // 供用户选择的角色下拉列表
      onChange: onChange,    // 改变角色的时候更新value的值
      value: selectBranchId,      // 选中的时候的值传给状态树，然后再提交的时候再做处理
      placeholder: "请选择",
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT

    }

    return (
      <div className="BranchScan">
        <Form horizontal>
          <Row>
            <Col span={12}>
              <FormItem 
                label='机构编号：'
                {...formItemLayout}
                required
              >
                <Input 
                  placeholder='请输入机构编号' 
                  size='large' 
                  disabled   
                  {
                    ...getFieldProps('brhId', {
                      initialValue: selectedBranch.brhId ? selectedBranch.brhId : ''
                    })
                  }
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构名称：'
                {...formItemLayout}
                required
              >
                <Input  
                  placeholder='请输入机构' 
                  size='large' 
                  {
                    ...getFieldProps('brhName', {
                      initialValue: selectedBranch.brhName ? selectedBranch.brhName : ''
                    })
                  }
                 />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='联系人：'
                {...formItemLayout}
              >
                <Input 
                  placeholder='请输入用户描述' 
                  size='large' 
                  {
                    ...getFieldProps('brhPerson', {
                      initialValue: selectedBranch.brhPerson ? selectedBranch.brhPerson : ''
                    })
                  }
                 />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构等级：'
                {...formItemLayout}
                required
              >
                <Select 
                  placeholder='请选择机构等级'
                  {...getFieldProps('brhLevel', {initialValue: getLevel()})}
                >
                  {setOptions}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='联系电话：'
                {...formItemLayout}
              >
                <Input 
                  placeholder='请输入联系电话' 
                  size='large' 
                  {...getFieldProps('brhPhone', {initialValue: selectedBranch.brhPhone})}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构描述：'
                {...formItemLayout}
              >
                <Input 
                  placeholder='请填写机构描述' 
                  size='large' 
                  {...getFieldProps('brhDesc', {
                    initialValue: selectedBranch.brhDesc ? selectedBranch.brhDesc : ''
                  })}
                 />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='地区编号：'
                {...formItemLayout}
              >
                <Input 
                  placeholder='请输入地区编号' 
                  size='large' 
                  {...getFieldProps('brhRegionId', {
                    initialValue: selectedBranch.brhRegionId ? selectedBranch.brhRegionId : ''
                  })}
                />
              </FormItem>   
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构地址：'
                {...formItemLayout}
              >
                <Input 
                  placeholder='请输入机构地址' 
                  size='large' 
                  {...getFieldProps('brhAddress', {
                    initialValue: selectedBranch.brhAddress ? selectedBranch.brhAddress : ''
                  })}
                 />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='所属机构：'
                placeholder='请选择所属机构'
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
      </div>
    )
  }
}

export default Form.create()(BranchScan)