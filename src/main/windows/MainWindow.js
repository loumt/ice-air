"use strict"
const electron = require('electron')
const env = require('./../env')
const electronLocalShortcut = require('electron-localshortcut')
const {dialog, BrowserWindow} = electron
const WindowConstant = require('./../constants/WindowConstant')
const ImageTool = require('../tools/ImageTool')
const DialogTool = require('../tools/DialogTool')
const ConfigTool = require('../tools/ConfigTool')
const ConnectionPool = require('./../connections/ConnectionPool')

const PublicEnv = {
  devTool:env.DEV_TOOL,
  isDev: process.env.NODE_ENV === 'development',
  url: process.env.NODE_ENV === 'development'? 'http://localhost:9080' : `file://${__dirname}/app.html`
}

console.log(`isDev:${PublicEnv.isDev} url:${PublicEnv.url}`);
console.log('This platform : ' + process.platform);

class MainWindow {

  constructor() {
    this.createMainWindow()
    this.initWindowContent()
    this.initWindowEvent()
    this.initWindowShortCut()
    this.initThumbnail()

    //登录状态
    this.loginState = {YES: true, NO: false}
    this.loginState.current = this.loginState.NO

    //闪烁状态
    this.frashCurrentState = false
  }

  createMainWindow() {
    let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    this.mainWindow = new BrowserWindow({
      title: WindowConstant.WINDOW_CONFIG.TITLE,
      width: width * 0.8,
      height: height * 0.8,
      minHeight: height * 0.5,
      minWidth: width * 0.5,
      resizable: true,
      fullscreen: false,
      center: true,
      show: false,
      movable: true,
      alwaysOnTop: false,
      darkTheme: true,
      skipTaskbar: false,
      // parent:top,
      // modal:true,
      // opacity:0.9,
      // backgroundColor: '#2e2c29',
      transparent: false,
      frame: false,
      icon: ImageTool.getWindowIcon(),
      autoHideMenuBar: true,
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true,
        webSecurity: false
      }
    })
  }

  initWindowEvent() {
    this.mainWindow.once('ready-to-show', () => {
      this.show()
    })
    this.mainWindow.on('close', (e) => {
      e.preventDefault()
      this.exitDialog()
    })
    this.mainWindow.on('resize', (e) => {
      // this.mainWindow.reload()
    })
  }

  openDevTools() {
    this.mainWindow.webContents.openDevTools()
  }

  close() {
    this.mainWindow.close()
  }

  show() {
    this.mainWindow.show()
    this.mainWindow.focus()
  }

  hide() {
    this.mainWindow.hide()
  }

  isVisible() {
    return this.mainWindow.isVisible()
  }

  min() {
    this.mainWindow.minimize()
  }

  setFullScreen(fullScreen) {
    ConfigTool.save(ConfigTool.KEY_CUSTOMER_WINDOW_FULLSCREEN, fullScreen)
    this.mainWindow.setFullScreen(fullScreen)
  }

  getFullScreen() {
    return this.mainWindow.getFullScreen()
  }

  maxOrNot() {
    if (this.mainWindow.isMaximized()) {
      this.mainWindow.unmaximize()
    } else {
      this.mainWindow.maximize()
    }
  }

  isMinimized() {
    return this.mainWindow.isMaximized()
  }

  restore() {
    this.mainWindow.restore()
  }

  load() {
    this.mainWindow.loadURL(PublicEnv.url)
  }

  initWindowContent() {
    if (PublicEnv.isDev || PublicEnv.devTool){
      this.openDevTools()
    }

    this.load()
    this.initWebContentEvent()
  }

  initWindowShortCut() {
    electronLocalShortcut.register(this.mainWindow, 'Esc', () => {
      if (this.mainWindow.isFullScreen()) {
        this.setFullScreen(!this.mainWindow.isFullScreen())
      } else {
        this.mainWindow.close()
      }
    })

    electronLocalShortcut.register(this.mainWindow, 'F11', () => {
      this.setFullScreen(!this.mainWindow.isFullScreen())
    })
  }

  initWebContentEvent() {
    this.mainWindow.webContents.on('crashed', () => {
      const options = {
        type: 'info',
        title: 'Renderer Process Crashed',
        message: 'This process has crashed.',
        buttons: ['Reload', 'Close']
      }

      dialog.showMessageBox(options, (index) => {
        if (index === 0) this.mainWindow.reload()
        else this.mainWindow.close()
      })
    })
  }


  initThumbnail() {
    if (!WindowConstant.WINDOW_CONFIG.SHOW_THUMBNAIL) {
      return
    }
    let [width, height] = this.mainWindow.getSize()
    this.mainWindow.setThumbnailClip({
      x: width - 0.8 * width,
      y: height - 0.8 * height,
      width: width - 0.2 * width,
      height: height - 0.2 * height
    })
    this.mainWindow.setThumbnailToolTip('Cloud-App')
    this.mainWindow.setThumbarButtons([])
  }

  exitDialog() {
    if (ConnectionPool.isHasActive()) {
      this.send('connections-active')
      DialogTool.errorDialog('Warning', 'Connection Active ...')
    } else {
      DialogTool.quitConfirm()
    }
  }

  recycleAlwaysOnTop(flag) {
    this.mainWindow.setAlwaysOnTop(flag || !this.mainWindow.isAlwaysOnTop())
  }

  send(opcode, data) {
    this.mainWindow.webContents.send(opcode, data)
  }

  updateLoginState(state) {
    this.loginState.current = state
  }

  getLoginState() {
    return this.loginState.current
  }

  flashFrame(){
    this.frashCurrentState = !this.frashCurrentState
    this.mainWindow.flashFrame(!this.frashCurrentState)
  }
}


module.exports = MainWindow;