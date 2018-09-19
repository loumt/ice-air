"use strict";
const ConfigTool = require('./tools/ConfigTool')
const ObjectUtils = require('./utils/ObjectUtils')
const pck = require('./../../package.json')

let config = {}
config[ConfigTool.KEY_SERVER_PROTOCOL] = 'http'
config[ConfigTool.KEY_SERVER_HOSTNAME] = '192.168.16.66'
config[ConfigTool.KEY_SERVER_PORT] = '3020'

config[ConfigTool.KEY_AD_PROTOCOL] = 'http'
config[ConfigTool.KEY_AD_HOSTNAME] = '192.168.3.184'
config[ConfigTool.KEY_AD_PORT] = '8000'

config[ConfigTool.KEY_CUSTOMER_WINDOW_FULLSCREEN] = true
config[ConfigTool.KEY_CUSTOMER_WINDOW_WIDTH] = 768
config[ConfigTool.KEY_CUSTOMER_WINDOW_HEIGHT] = 1024
config[ConfigTool.KEY_CUSTOMER_WINDOW_NOICE] = false
config[ConfigTool.KEY_CUSTOMER_WINDOW_SILENCE] = false

config[ConfigTool.KEY_CUSTOMER_APP_IS_OPEN_LOCAL] = true
config[ConfigTool.KEY_CUSTOMER_APP_AD_SHOW_TIMES] = 20 * 1000
config[ConfigTool.KEY_CUSTOMER_APP_SHOW_AD] = true
config[ConfigTool.KEY_CUSTOMER_APP_LANGUAGE] = "1"

config[ConfigTool.KEY_CURRENT_VERSION] = pck.version
config[ConfigTool.KEY_OLD_VERSION] = ''

module.exports = ObjectUtils.assignProperties(config)