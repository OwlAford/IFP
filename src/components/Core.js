import React from 'react'
import 'STYLE'

const Core = ({ children }) => (
  <div className='app-container'>
    { children }
  </div>
)

Core.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default Core
