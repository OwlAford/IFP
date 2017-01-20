import React from 'react'
import utils from './public'
let Auth = {}

Auth.handleItem = function(menu, buttonList) {
  const handleButton = []
  const divider = (<span className="ant-divider"/>)
  const length = buttonList.length
  buttonList.map((item, i) => {
    const button = Auth.checkButton(menu, item.item, item.button)
    if (button) {
      handleButton.push(button)
      if (i != buttonList.length - 1) {
        handleButton.push(divider)
      }
    }
  })
  return handleButton.length == 0 ? (<span>无操作权限</span>) : (handleButton.map((item, i) =>(<span key={i}>{item}</span>)))
}

Auth.checkButton = function(menu, item, button) {
  if (!menu) {
    return null
  }
  let menuItem = item
  item.length > 4 ? null : menuItem = menu.currentMenu + item
  return utils.searchList(menu.menuItemList, 'menuItemId', menuItem) ? button : null
}

export default Auth