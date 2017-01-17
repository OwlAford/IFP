import utils from './public'
let authUtil = {}

authUtil.handleItem = function(menu, buttonList) {
  const handleButton = []
  const divider = (<span className="ant-divider"/>)
  for (var i =  0; i < buttonList.length; i ++) {
    if (menu) {
      const button = authUtil.checkButton(menu, buttonList[i].item, buttonList[i].button)
      if (button) {
        handleButton.push(button)
        if (i != buttonList.length - 1) {
          handleButton.push(divider)
        }
      }
    } else {
      handleButton.push(buttonList[i].button)
      if (i != buttonList.length - 1) {
        handleButton.push(divider)
      }
    }
  }
  if (handleButton.length == 0) {
    handleButton.push('无操作权限')
  }
  return (<div>{handleButton}</div>)
}

authUtil.checkButton = function(menu, item, button) {
  if (!menu) {
    return null
  }
  if (item.length > 4) {
    if (utils.searchList(menu.menuItemList, 'menuItemId', item)) {
      return button
    }
  } else {
    const currentMenu = menu.currentMenu
    const menuItem = currentMenu + item
    if (utils.searchList(menu.menuItemList, 'menuItemId', menuItem)) {
      return button
    }
  }
  return null
}

export default authUtil