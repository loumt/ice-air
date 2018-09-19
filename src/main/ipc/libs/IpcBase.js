class IpcBase{
  constructor(main = {}){
    this.main = main
    this.app = main.app
    this.tray = main.tray
    this.mainWindow = main.mainWindow
    this.ipcMain = main.ipcMain
  }
}
module.exports = IpcBase