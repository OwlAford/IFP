import React, { Component } from 'react'
import { Button, Table } from 'antd'

export default class CheckListView extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCheckList({
      currentPage: 1,
      turnPageShowNum: 10
    })
  }

  render() {
    const {  } = this.props

    return (
      <div className="pageCheckList">
        CheckListView
      </div>
    )
  }

}