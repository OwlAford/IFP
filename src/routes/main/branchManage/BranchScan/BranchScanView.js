import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, DatePicker, Select, message, Modal, TreeSelect, notification } from 'antd'
import Spin from 'COMPONENT/Spin'
import utils from 'UTIL/public'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = TreeSelect.TreeNode
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let BranchScan = class BranchScanView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      brhId: 0,
      loading: false
    }
  }

  componentWillUnmount() {
    this.props.resetForm()   // 清空整个表单
    this.props.cleanBranch() // 清空所属机构的选择框
  }

  componentWillReceiveProps(newProps) {
    const { resetFields, getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form
    const { selectedBranch, selectedOperate, selectBranchId, branchModify, resetForm, cleanBranch, afterOperateType, changeBranchAfterType, branchDelete } = newProps

    // 当选择侧边分支且分支进行了切换时
    if (!utils.isEmptyObject(selectedBranch) && this.state.brhId != selectedBranch.brhId) {
      this.setState({
        brhId: selectedBranch.brhId
      })
      resetFields()
    }

    // 增删改操作后响应
    const MsgSuc = (d) => {
      notification.success({
        message: '成功',
        description: d
      })
    }
    const MsgFal = (d) => {
      notification.warning({
        message: '失败',
        description: d
      })
    }
    const showSpin = () => {
      this.setState({
        loading: true
      })
    }
    const hideSpin = () => {
      this.setState({
        loading: false
      })
    }
    if (afterOperateType != '0') {
      let type = afterOperateType
      switch(type) {
        case '1':
          console.log('修改成功！')
          MsgSuc('修改成功！')
          break
        case '2':
          MsgFal('修改失败！')
          break
        case '3':
          MsgSuc('删除成功！')
          break
        case '4':
          MsgFal('删除失败！')
          break
        case '5':
          MsgSuc('添加成功！')
          break
        case '6':
          MsgFal('添加失败！')
          break
      }
      changeBranchAfterType({type: '0'})
    }

    // 当点击修改机构
    if (selectedOperate == 'MODIFY_BRANCH') {    
      let level = ''
      if (!utils.isEmptyObject(selectedBranch)) {
        let params = getFieldsValue()
        switch (params.brhLevel) {
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
      }
      let data = Object.assign({}, getFieldsValue(), {brhLevel: level}, {brhParentId: selectBranchId})
      if (data.brhId != '' && data.brhId != undefined && data.brhId != null) {
        showSpin()
        branchModify(data, () => {
          hideSpin()
          resetForm()       // 清空整个表单
          cleanBranch()     // 清空所属机构的选择框
        }, hideSpin)
      }
    // 当点击删除机构  
    } else if (selectedOperate == 'DELETE_BRANCH') {
      if (!utils.isEmptyObject(selectedBranch)) {
        let params = getFieldsValue()
        showSpin()
        branchDelete(params, () => {
          resetForm()
          cleanBranch()
          hideSpin()
        }, hideSpin())
      }
    }

  }

  render() {
    const { getFieldDecorator } = this.props.form
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
      onChange: onChange,         // 改变角色的时候更新value的值
      value: selectBranchId,      // 选中的时候的值传给状态树，然后再提交的时候再做处理
      placeholder: "请选择",
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT

    }

    return (
      <div className="app-form-scan">
        <Form horizontal>
          <Row>
            <Col span={12}>
              <FormItem 
                label='机构编号：'
                {...formItemLayout}
                required
              >
                {
                  getFieldDecorator('brhId', {
                    initialValue: selectedBranch.brhId ? selectedBranch.brhId : ''
                  })(
                    <Input 
                      placeholder='请输入机构编号' 
                      size='large' 
                      disabled   
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构名称：'
                {...formItemLayout}
                required
              >
                {
                  getFieldDecorator('brhName', {
                    initialValue: selectedBranch.brhName ? selectedBranch.brhName : ''
                  })(
                    <Input  
                      placeholder='请输入机构' 
                      size='large' 
                     />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='联系人：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('brhPerson', {
                    initialValue: selectedBranch.brhPerson ? selectedBranch.brhPerson : ''
                  })(
                    <Input 
                      placeholder='请输入用户描述' 
                      size='large' 
                     />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构等级：'
                {...formItemLayout}
                required
              >
                {
                  getFieldDecorator('brhLevel', {
                    initialValue: getLevel()
                  })(
                    <Select 
                      placeholder='请选择机构等级'
                    >
                      {setOptions}
                    </Select>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='联系电话：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('brhPhone', {
                    initialValue: selectedBranch.brhPhone
                  })(
                    <Input 
                      placeholder='请输入联系电话' 
                      size='large' 
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构描述：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('brhDesc', {
                    initialValue: selectedBranch.brhDesc ? selectedBranch.brhDesc : ''
                  })(
                    <Input 
                      placeholder='请填写机构描述' 
                      size='large' 
                     />
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem 
                label='地区编号：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('brhRegionId', {
                    initialValue: selectedBranch.brhRegionId ? selectedBranch.brhRegionId : ''
                  })(
                    <Input 
                      placeholder='请输入地区编号' 
                      size='large' 
                    />
                  )
                }
              </FormItem>   
            </Col>
            <Col span={12}>
              <FormItem 
                label='机构地址：'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('brhAddress', {
                    initialValue: selectedBranch.brhAddress ? selectedBranch.brhAddress : ''
                  })(
                    <Input 
                      placeholder='请输入机构地址' 
                      size='large' 
                     />
                  )
                }
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
        <Spin loading={this.state.loading}/>
      </div>
    )
  }
}

export default Form.create()(BranchScan)