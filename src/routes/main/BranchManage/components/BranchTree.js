import React, { Component } from 'react'
import {Tree} from 'antd'
const TreeNode = Tree.TreeNode

export default class BarnchTree extends Component {
  
  constructor(props) {
    super(props)
    this.bindDataLoop = this.bindDataLoop.bind(this)
  }

  bindDataLoop(item) {
    if (item.children.length >= 1) {
      return (
        <TreeNode title={item.name} key={item.id}>
          {item.children.map(this.bindDataLoop)}
        </TreeNode>
        )
    } else {
      return <TreeNode title={item.name} key={item.id} isLeaf={true}/>
    }
  }

  render() {
    const { changeBranchSelected } = this.props
    const { userGetBranchList } = this.props.main
    if (!userGetBranchList) {
      return false
    }
    return (
      <div className="BarnchTree">
        <Tree 
          onSelect={
            (info) => {
              changeBranchSelected({
                brhId: info[0]
              })
            }
          }
        >
          {userGetBranchList.map(this.bindDataLoop)}
        </Tree>
      </div>
    )
  }
}