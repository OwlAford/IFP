let utils = new Object()

utils.getNowDateStr = function (date) {
	let nowDate = new Date()
	if (date) {
		nowDate = date
	}
	return nowDate.getFullYear().toString() + (nowDate.getMonth() + 1).toString() + nowDate.getDate().toString()
}

utils.getNowTimeStr = function (date) {
	let nowDate = new Date()
	if (date) {
		nowDate = date
	}
	return nowDate.getHours().toString() + nowDate.getMinutes().toString() + nowDate.getSeconds().toString()
}

utils.getNowDateTimeStr = function (date) {
	let nowDate = new Date()
	if(date) {
		nowDate = date
	}
	return nowDate.getFullYear().toString() + (nowDate.getMonth()+1).toString() + nowDate.getDate().toString() + nowDate.getHours().toString() + nowDate.getMinutes().toString() + nowDate.getSeconds().toString()
}

utils.objToKv = function (obj) {
	if (typeof obj != 'object') {
		throw Error('only transform simple Object to k-v params!')
	}
	var kvArray = []
	for (let key in obj) {
		if (obj[key] instanceof Array) {
			arrayFormatter(kvArray, key, obj[key])
		} else {
			kvArray.push(key + '=' + obj[key])
		}
	}
	return kvArray.join('&')
}

function arrayFormatter (target, arrayName, array) {
	for (let i in array) {
		let el = array[i]
		for (let p in el) {
			if (typeof el[p] ==' object') {
				target.push(`${arrayName}[${i}][${p}] = ${JSON.stringify(el[p])}`)
			} else {
				target.push(`${arrayName}[${i}][${p}] = ${el[p]}`)
			}
		}
	}
}

utils.groupList = function (list, idName, parentIdName, childrenName, conver) {
  let groupList = []
	let keyObjMap = {}

	list.forEach(function (value) {
		keyObjMap[value[idName]] = (!!conver ? conver(value) : value)
	})
	list.forEach(function (value) {
		if (!value[parentIdName] || !keyObjMap[value[parentIdName]]) {
			groupList.push(keyObjMap[value[idName]])
		} else if (keyObjMap[value[parentIdName]]) {
			if (!keyObjMap[value[parentIdName]][childrenName])
				keyObjMap[value[parentIdName]][childrenName] = new Array()
			keyObjMap[value[parentIdName]][childrenName].push(keyObjMap[value[idName]])
		}
	})
	keyObjMap = null
	return groupList
}

utils.getNodeFromGroupList = function(id, list, idName, childrenName, conver) {
  var node = null
  for (var el of list) {
    if (el[idName] == id) {
			node = (!!conver ? conver(el) : el)
			break
		} else if (el[childrenName] && el[childrenName].length > 0) {
			node = this.getNodeFromGroupList(id, el[childrenName], idName, childrenName, conver)
			if (node) {
				node = (!!conver ? conver(node) : node)
				break
			}
		}
  }
  return node
}


utils.appendFiles = function (fd, name, files) {
  files.forEach(function (item) {
    if (item instanceof FileList) {
      var cnt = item.length
      for (var i = 0; i < cnt; i++) {
        var file = item[i]
        fd.append(name, file)
      }
    } else if (item instanceof File) {
      fd.append(name, item)
    }
  })
}

utils.makeFormData = function (obj) {
  var fd = new FormData()
  Object.keys(obj).forEach(function (key) {
    var value = obj[key]
    // console.log('fd.k-v: ', key, value)
    if (value === undefined || value === null) {
      fd.append(key, '')
    } else if (value instanceof FileList) {
      // Append files
      appendFiles(fd, key, [value])
    } else if (value instanceof Array && value.length > 0 && (value[0] instanceof FileList || value[0] instanceof File)) {
      // Append files
      appendFiles(fd, key, value)
    } else if (value === true || value === false) {
      // Boolean value
      fd.append(key, value ? 1 : 0)
    } else if (value instanceof Array) {
      value.forEach(function(item) {
        fd.append(key, item)
      })
    } else if (value instanceof Object) {
      fd.append(key, JSON.stringify(value))
    } else {
      fd.append(key, value)
    }
  });
  return fd
}

utils.getStatusClassArray = function(status, originValue) {
  const value = (originValue === undefined || originValue === null) ? originValue : String(originValue)
  const obj = {
    'error': status.errors,
    'validating': status.isValidating,
    'success': value && !status.errors && !status.isValidating
  }
  return Object.keys(obj).filter(function (key) {
    return obj[key]
  })
}

utils.getStatusClasses = function (status, originValue) {
  return getStatusClassArray(status, originValue).join(' ')
}

utils.getStatusHelp = function (status) {
    return status.isValidating ? "正在校验中.." : status.errors ? status.errors.join(',') : null
}

utils.updateFilters = function (oldFilters, name, operation, value) {
  let newFilters = []
  let matched = false
  oldFilters.forEach(function (item) {
    if (item[0] === name && item[1] === operation) {
      if (value !== undefined) {
        newFilters.push([name, operation, value])
      }
      matched = true
    } else {
      newFilters.push(item)
    }
  })

  if (!matched) {
    newFilters.push([name, operation, value])
  }
  return newFilters
}

utils.minus = function (a,b) {
  let rt = new Array()
  for (var ai of a) {
    if (b.indexOf(ai) == -1) {
      rt.push(ai)
    }
  }
  return rt
}

utils.getDecodeHtml = function (str) {
  if (str) {
    var arrEntities = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all,t) { return arrEntities[t] })
  }
  return str
}

utils.getConfigValue = function (list, type, key) {
  if (list) {
    const listValue = list.filter(item => {
      return item.config_type == type && item.config_key == key
    })
    if (listValue && listValue.length > 0) {
      return listValue[0].config_value
    }
  }
  return ""
}

utils.html2Escape = function (sHtml) {
 return sHtml.replace(/[<>&"]/g, function (c) { return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c] })
}

utils.openPostWindow = function (url, data, name) {  
  let temp_form = document.createElement("form")    
      temp_form.action = url  
      temp_form.target = "_blank"
      temp_form.method = "post"  
      temp_form.style.display = "none"
  for (let x in data) { 
    let opt = document.createElement("textarea");   
        opt.name = x 
        opt.value = data[x]  
        temp_form.appendChild(opt)   
  }
  temp_form.submit();    
  document.body.removeChild(temp_form) 
}

utils.openGetWindow = function (url, data, name) {  
  const params = utils.objToKv(data)
  let index = url.indexOf('?')
  if (index != -1) {
    url += params
  } else {
    url += '?' + params
  }
  window.open(url, name)
}

utils.openWindow = function (url, data, name, type) {  
  if (type == 'GET' || type == 'get') {
    utils.openGetWindow(url, data, name)
  } else {
    utils.openPostWindow(url, data, name)
  }
}

utils.searchList = function (list, key, value) {
  if (!list) return false
  for (var i = list.length - 1; i >= 0; i--) {
    const object = list[i]
    if (object[key] == value) {
      return true
    }
  }
  return false
}

export default utils