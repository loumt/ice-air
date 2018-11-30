"use strict";
import ConfigConstant from './constants/ConfigConstant'
import ObjectUtils from './utils/ObjectUtils'

let config = {}

//默认Server配置
config[ConfigConstant.KEY_SERVER_PROTOCOL] = 'http'
config[ConfigConstant.KEY_SERVER_HOSTNAME] = '192.168.3.203'
config[ConfigConstant.KEY_SERVER_PORT] = '3000'


//当前版本配置,此版本依据当前package的静态资源的版本
config[ConfigConstant.KEY_CURRENT_VERSION] = "v2.0.0-beta4"
config[ConfigConstant.KEY_OLD_VERSION] = ''

config[ConfigConstant.KEY_CUSTOMER_APP_IS_OPEN_LOCAL] = false
config[ConfigConstant.KEY_CUSTOMER_APP_LANGUAGE] = "zh-CN"

//mstsc应用配置
config[ConfigConstant.KEY_CUSTOMER_APP_MSTSC] = ''

let result = ObjectUtils.assignProperties(config)

export default result