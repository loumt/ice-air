"use strict"

const IpcBase = require('./IpcBase')
const {BrowserWindow} = require('electron')
const ConnectionPool = require('./../../connections/ConnectionPool')
const SanlogicRDP = require('./../../connections/SanlogicRDP')
const MenuItemTool = require('./../../tools/MenuItemTool')
const {to} = require('./../../tools/ExtendTool')
const UpdateHandler = require('./../../update/UpdateHandler')
const pck = require('./../../../../package.json')

/**
 * Ipc > Other 其他
 * main中AppWindow对象
 */
class IpcOthers extends IpcBase {
  constructor(mainWindow) {
    super({mainWindow})
  }

  console() {
    return (e, content) => {
      console.log(content)
    }
  }

  allowLogout() {
    return (e) => {
      e.returnValue = !ConnectionPool.isHasActive()
    }
  }


  openLocalRDP() {
    return (e, args) => {
      console.log(args)
      let config = args
      let connectionId = args['token']


      let connection = new SanlogicRDP(config, connectionId)

      //不管连接成功与否,该进程都会先生成.
      //置入池中,用于控制客户端的关闭限制
      ConnectionPool.new(connectionId, connection)

      connection.on('close', () => {
        this.mainWindow.send('connection-close', connectionId)
        ConnectionPool.del(connectionId)
      })
      connection.init();
    }
  }


  rightClickMenu() {
    return () => {
      let menu = new MenuItemTool(MenuItemTool.Type.ELECTRON).fork()
      menu.popup(BrowserWindow.getFocusedWindow())
    }
  }

  getClientVersion() {
    return (e) => {
      this.mainWindow.send('send-client-version', pck.version)
    }
  }

  getVersionInfo() {
    return async () => {
      let [error, result] = await to(UpdateHandler.getVersionInfo());
      if (error) {
        return e.returnValue = {error: error}
      }
      e.returnValue = {versionInfo: result}
    }
  }

  static getInstance(mainWindow) {
    return new IpcOthers(mainWindow)
  }
}

module.exports = IpcOthers;