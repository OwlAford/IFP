import React from 'react'
import 'STYLE'

// 构建页面主视图
export const CoreLayout = ({ children }) => (
  <div className='app-container'>
    { children }
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
