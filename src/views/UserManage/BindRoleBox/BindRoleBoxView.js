import React, { Component } from 'react'
import { Form, Button, Modal, Select, TreeSelect } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const SHOW_PARENT = TreeSelect.SHOW_PARENT

let BindRoleBox = class BindRoleBoxView extends Component {

  constructor(props) {
    super(props)
  } 

  onClose() {
    this.props.closeBindRole()
  }

  onSubmit() {

  }

  render() {
    const { visible, treeNodes, selectRoleList, updateRoleTree } = this.props
    const onChange = value => updateRoleTree(value)
    const treeProps  = {
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      treeData: treeNodes,             // 供用户选择的角色下拉列表
      onChange: onChange,              // 改变角色的时候更新value的值
      value: selectRoleList,           // 选中的时候的值
      defaultValue: selectRoleList,    // 默认值
      placeholder: '请选择',
      treeDefaultExpandAll: true,
      treeCheckStrictly: false,
      treeCheckable: false,
      showCheckedStrategy: SHOW_PARENT,
      multiple: true
    }

    return (
      <div className="bindBox">
        <Modal
          title="角色绑定"
          width={680}
          visible={visible}
          onOk={this.onSubmit}
          onCancel={e => this.onClose()}
          footer={[
              <Button key="back" type="ghost" size="large" onClick={(e) => this.onClose()}>
                返 回
              </Button>,
              <Button 
                key='submit' 
                type='primary' 
                size='large'  
                onClick={(e) => this.onSubmit()} 
              >
                提 交
              </Button>
            ]}
          >           
            <Form horizontal>
              <FormItem 
                label='角色选择：'
                required
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
              >
                <TreeSelect 
                  {...treeProps}
                >
                </TreeSelect>
              </FormItem>
            </Form>
          </Modal>
      </div>
    )
  }

}

export default Form.create()(BindRoleBox)