"use strict";
const fs = require('fs')
const settings = require('electron-settings')

/**
 * 配置工具
 */
class ConfigTool {
    /**
     * 文件不存在,初始化
     */
    static init(config) {
        if (!fs.existsSync(ConfigTool._getConfigFilePath())) {
          ConfigTool.setAll(config)
        }
    }

  /**
   * 设置
   */
  static setAll(config){
      settings.setAll(config,{prettify:true})
  }

  /**
     * 获取配置文件位置
     * @returns {*}
     */
    static _getConfigFilePath() {
        return settings.file()
    }

    /**
     * 保存配置
     * arr (...keys,value)
     */
    static save(key,value) {
        settings.set(key,value)
    }

    /**
     * 获取配置
     * arr (...keys)
     */
    static get(keys) {
      if(typeof keys === 'string'){
        return settings.get(keys)
      }else if (Array.isArray(keys)){
        return settings.get(keys.join('.'))
      }else{
        return settings.get('')
      }
    }

    //methods
    static getFullScreen(){
      return ConfigTool.get(ConfigTool.KEY_CUSTOMER_WINDOW_FULLSCREEN)
    }
}

//cloudapp服务
ConfigTool.KEY_SERVER = 'server'
ConfigTool.KEY_SERVER_PROTOCOL = 'server.protocol'
ConfigTool.KEY_SERVER_HOSTNAME = 'server.hostname'
ConfigTool.KEY_SERVER_PORT = 'server.port'

//广告服务
ConfigTool.KEY_AD = 'ad'
ConfigTool.KEY_AD_PROTOCOL = 'ad.protocol'
ConfigTool.KEY_AD_HOSTNAME = 'ad.hostname'
ConfigTool.KEY_AD_PORT = 'ad.port'

//用户设置
ConfigTool.KEY_CUSTOMER = 'customer'
ConfigTool.KEY_CUSTOMER_WINDOW_FULLSCREEN = 'customer.window.fullScreen'
ConfigTool.KEY_CUSTOMER_WINDOW_WIDTH = 'customer.window.width'
ConfigTool.KEY_CUSTOMER_WINDOW_HEIGHT = 'customer.window.height'
ConfigTool.KEY_CUSTOMER_WINDOW_SILENCE = 'customer.window.silence'
ConfigTool.KEY_CUSTOMER_WINDOW_NOICE = 'customer.window.noice'

//应用设置
ConfigTool.KEY_CUSTOMER_APP_IS_OPEN_LOCAL = 'customer.app.is_open_local'
ConfigTool.KEY_CUSTOMER_APP_SHOW_AD = 'customer.app.show_ad'
ConfigTool.KEY_CUSTOMER_APP_AD_SHOW_TIMES = 'customer.app.ad_show_times'
//语言
ConfigTool.KEY_CUSTOMER_APP_LANGUAGE = 'customer.app.language'

//版本控制
ConfigTool.KEY_CURRENT_VERSION = 'currentVersion'
ConfigTool.KEY_OLD_VERSION = 'oldVersion'



module.exports = ConfigTool