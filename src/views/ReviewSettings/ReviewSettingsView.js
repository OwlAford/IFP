import React, { Component } from 'react'
import { Row, Col } from 'antd'
import InputSearch from 'COMPONENT/InputSearch'



export default class ReviewSettingsView extends Component {

  constructor(props) {
    super(props)

  } 

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const { name } = this.props
    return (
      <div className="pageReviewSettings">
        {name}
      </div>
    )
  }

}