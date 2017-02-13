import React, { Component, PropTypes } from 'react'
import { Table, Row, Col, Button } from 'antd'
import utils from 'UTIL/public'
import AU from 'UTIL/auth'
import AddEditPostBox from './AddEditPostBox'


export default class PostManageView extends Component {

  constructor(props) {
    super(props)
  } 

  addPost() {
    this.props.setAddPostState()
  }

  modPost(info) {
    this.props.setEditPostState(info)
  }

  delPost(info) {
    this.props.deletePost(info.postId)
  }

  componentWillMount() {
    this.props.resetPageState()
    this.props.getPostList()
  }

  render() {
    const { setCurPageState, setPageShowNum, getPostList, userMenu, postList, turnPageTotalNum, currentPage, turnPageShowNum } = this.props

    const columns = [{
        title: '岗位编号',
        dataIndex: 'postId',
        key: 'postId'
      }, {
        title: '岗位名称',
        dataIndex: 'postName',
        key: 'postName'
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render(text, record) {
          return(<span>{text.substring(0, 4)}/{text.substring(4, 6)}/{text.substring(6, 8)} {text.substring(8, 10)}:{text.substring(10, 12)}</span>)
        }
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(text, record) {
          return <span>{text == '1' ? '可用' : '禁用'}</span>
        }
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          const buttonList = [{
            item: 'F002',
            button: <a onClick={e => {this.modPost(record)}}>修改</a>
          }, {
            item: 'F004', 
            button: <a onClick={e => {this.delPost(record)}}>删除</a>
          }]
          return AU.handleItem(userMenu, buttonList)
        }
      }
    ]

    let pagination = {
      total: Number(turnPageTotalNum),
      defaultCurrent: 1,
      current: Number(currentPage),
      showSizeChanger: true,
      pageSize: Number(turnPageShowNum),
      onShowSizeChange(current, pageSize) {
        setPageShowNum(pageSize)
        getPostList()
      },
      onChange(current) {
        setCurPageState(current)
        getPostList()
      },
    }

    const addBtn = (
      <Button 
        size="large" 
        type="primary" 
        icon="plus-circle-o"
        onClick={(e) => this.addPost()}
      >
        新增岗位
      </Button>
    )

    return (
      <div className="pagePostManage">
        <div style={{padding: '20px 30px', textAlign: 'right'}}>
          {AU.checkButton(userMenu, 'F001', addBtn)}
        </div>
        <div className='app-narrow-table' style={{padding: '0 30px'}}>
          <Table 
            rowKey='updateTime'
            columns={columns} 
            dataSource={postList} 
            pagination={pagination} 
            bordered
          />
        </div>
        <AddEditPostBox/>
      </div>
    )
  }

}