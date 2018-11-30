"use strict"
import electron, {BrowserWindow, dialog} from 'electron'
import path from 'path'
import url from 'url'
import electronLocalShortcut from 'electron-localshortcut'
import WindowConstant from './../constants/WindowConstant'
import ImageTool from '../tools/ImageTool'
import DialogTool from '../tools/DialogTool'
import ConnectionPool from './../connections/ConnectionPool'
import {EventEmitter} from 'events'

const _globalConfig = {
  isDev: process.env.NODE_ENV === 'development',
  devTool: process.env.DEV_TOOL,
  webUrl: process.env.WEB_URL ? process.env.WEB_URL : url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, 'desk.html')
  })
}
// console.dir(_globalConfig)

export default class MainWindow extends EventEmitter {

  constructor() {
    super()
    this.windowOptions = {width: 0, height: 0}

    //登录状态
    this.loginState = {YES: true, NO: false}
    this.loginState.current = this.loginState.NO

    //登录之后是否最大化
    this.maxState = {YES: true, NO: false}
    this.maxState.current = this.maxState.NO

    //闪烁状态
    this.frashCurrentState = false

    this.createMainWindow()
    this.initWindowContent()
    this.initWindowEvent()
    this.initWindowShortCut()
    this.initThumbnail()
  }

  createMainWindow() {
    let {workAreaSize} = electron.screen.getPrimaryDisplay()
    let {width, height} = workAreaSize

    Object.assign(this.windowOptions, workAreaSize)

    this.mainWindow = new BrowserWindow({
      title: WindowConstant.WINDOW_CONFIG.TITLE,
      width: width * 0.8,
      height: height * 0.8,
      minHeight: WindowConstant.WINDOW_CONFIG.MIN_HEIGHT,
      minWidth: WindowConstant.WINDOW_CONFIG.MIN_WIDTH,
      resizable: false,
      fullscreen: false,
      maximizable: true,
      minimizable: false,
      center: true,
      show: false,
      movable: false,
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
        webSecurity: false,
        preload: path.join(__dirname, './preload.js')
      }
    })
  }

  initWindowEvent() {
    this.mainWindow.once('ready-to-show', () => {
      this.show()
    })
    this.mainWindow.on('close', (e) => {
      e.preventDefault()
      //web exit dialog
      this.exitDialog()
    })
    this.mainWindow.on('resize', (e) => {
      // this.mainWindow.reload()
    })

    this.mainWindow.on('app-command', (e, cmd) => {
      console.log(cmd)
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

  reload() {
    this.mainWindow.reload()
  }

  setFullScreen(fullScreen) {
    this.mainWindow.setFullScreen(fullScreen)
  }

  getFullScreen() {
    return this.mainWindow.isFullScreen()
  }

  maxOrNot() {
    if (this.mainWindow.isMaximized()) {
      this.mainWindow.unmaximize()
    } else {
      this.mainWindow.maximize()
    }
  }

  destroy() {
    this.mainWindow.destroy()
  }

  min() {
    this.mainWindow.minimize()
  }

  restore() {
    this.mainWindow.restore()
  }

  render() {
    this.mainWindow.loadURL(_globalConfig.webUrl)
  }

  initWindowContent() {
    this.render()
    if (process.env.DEV_TOOL) {
      this.openDevTools()
    }
    this.initWebContentEvent()
  }

  initWindowShortCut() {
    electronLocalShortcut.register(this.mainWindow, 'Esc', () => {
      let isFullScreen = this.mainWindow.isFullScreen()
      this.send('esc', {currentWindowState: {fullScreen: isFullScreen, loginState: this.loginState.current}})
      if (this.mainWindow.isFullScreen()) {
        // this.setFullScreen(!this.mainWindow.isFullScreen())
      } else {
        // this.mainWindow.close()
      }
    })

    electronLocalShortcut.register(this.mainWindow, 'F11', () => {
      this.mainWindow.setResizable(true)
      this.setFullScreen(!this.mainWindow.isFullScreen())
      this.mainWindow.setResizable(false)
    })
  }

  updateLoginState(state) {
    this.loginState.current = state
    this.mainWindow.setResizable(true)
    //1.登录之后无最大化,小窗与全屏间的切换
    if (state) {
      this.mainWindow.maximize()
    } else {
      if (this.mainWindow.isFullScreen()) {
        this.mainWindow.setFullScreen(false)
      }
      this.mainWindow.unmaximize()
    }
    this.mainWindow.setResizable(false)
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
    } else {
      DialogTool.quitConfirm()
    }
  }

  recycleAlwaysOnTop(flag) {
    this.mainWindow.setAlwaysOnTop(flag || !this.mainWindow.isAlwaysOnTop())
  }

  getAlwaysOnTop() {
    return this.mainWindow.isAlwaysOnTop()
  }

  send(opcode, data) {
    this.mainWindow.webContents.send(opcode, data)
  }

  getLoginState() {
    return this.loginState.current
  }

  flashFrame() {
    this.frashCurrentState = !this.frashCurrentState
    this.mainWindow.flashFrame(!this.frashCurrentState)
  }

  getMainWindow() {
    return this.mainWindow
  }
}