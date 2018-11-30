"use strict";

import path from 'path'
import fs from 'fs'
const pluginsFolderName = 'plugins'
const pluginsIn = path.join(path.dirname(require('electron').app.getPath('exe')), pluginsFolderName)
const PLUGINS_RCP = process.env.PLUGINS_RCP

/**
 * Plugin Extend
 */
class PluginsExtent {
  constructor(){}
  /**
   * 获取RCP客户端路径
   * @returns {string}
   */
  rcpPath(){
    let rcp = path.join(pluginsIn,'rcp','sanrcpclient.exe')
    return fs.existsSync(rcp) && !PLUGINS_RCP ? rcp : PLUGINS_RCP
  }
}
export default new PluginsExtent();
