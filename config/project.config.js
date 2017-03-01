const path = require('path')
const debug = require('debug')('app:config:project')
const argv = require('yargs').argv
const ip = require('ip')

debug('Creating default configuration.')

// 默认配置
const config = {
  env : process.env.NODE_ENV || 'development',

  // 项目文件结构
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_public : 'public',
  dir_server : 'server',

  // 远程服务配置，默认开启代理
  service_agent : true,
  remote_host   : 'http://139.224.128.69:9080',
  project_name  : 'inmanage',

  // 本地服务配置
  server_host  : ip.address(),
  server_port  : process.env.PORT || 8000,
  autoOpenBrowser: true,

  // 编译配置
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime', 'transform-decorators-legacy'],
    presets        : ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-thunk',
    'md5',
    'nprogress',
    // 将部分 antd 组件打包在 vendor 内
    'antd/lib/button',
    'antd/lib/checkbox',
    'antd/lib/col',
    'antd/lib/date-picker',
    'antd/lib/form',
    'antd/lib/icon',
    'antd/lib/input',
    'antd/lib/message',
    'antd/lib/modal',
    'antd/lib/notification',
    'antd/lib/radio',
    'antd/lib/row',
    'antd/lib/select',
    'antd/lib/slider',
    'antd/lib/spin',
    'antd/lib/table',
    'antd/lib/tree',
    'antd/lib/tree-select'
  ]
}

// 全局环境配置参数
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// 基础路径配置
function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist)
}

// 调试环境配置
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const environments = require('./env.config')
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config
