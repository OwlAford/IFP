import React from 'react'
import { Tree } from 'antd'
const TreeNode = Tree.TreeNode

const bindDataLoop = (item) => {
  if (item.children.length >= 1) {
    return (
      <TreeNode title={item.name} key={item.id}>
        {item.children.map(bindDataLoop)}
      </TreeNode>
      )
  } else {
    return <TreeNode title={item.name} key={item.id} isLeaf={true}/>
  }
}

export const BranchTreeView = ({ selected, branchList }) => {
  if (!branchList) {
    return null
  }
  return (
    <div className="app-barnch-tree">
      <Tree 
        onSelect={
          (info, node) => {
            selected({
              brhId: info[0],
              title: node.node.props.title 
            })
          }
        }
      >
        {branchList.map(bindDataLoop)}
      </Tree>
    </div>
  )
}

export default BranchTreeView