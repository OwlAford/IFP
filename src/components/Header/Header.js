import React from 'react'
import { Link } from 'react-router'
import Account from '../Account'
import './Header.scss'

export const Header = () => (
  <div className="app-header">
    <div className="title">IFP内部管理系统</div>
    <div className="guide">
      <Link to='/inmanage/main' activeClassName='active'>首页</Link>
    </div>
    <Account/>
  </div>
)

export default Header
