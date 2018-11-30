/**
 * CreateBy loumt@sanlogic.com.
 */
'use strict'
import {Menu, Tray} from 'electron'
import {version as appVersion} from './../../../package.json'
import ConfigTool from '../tools/ConfigTool'
import ImageTool from '../tools/ImageTool'
import WindowConstant from './../constants/WindowConstant'
import language from './../lang'

export default class TrapClient {
  constructor({app, mainWindow}) {
    this.app = app
    this.mainWindow = mainWindow
    this.createTray()

    this.messageState = {YES: true, NO: false}
    this.messageState.current = this.messageState.NO

    this.flashingState = {YES: true, NO: false}
    this.flashingState.current = this.flashingState.YES
  }

  getLabels(lang) {

    let AdapterProperties = language[lang] || language['zh-CN']
    let {tray} = AdapterProperties.default
    let {
      version,
      update,
      fullscreen,
      top,
      setting,
      about,
      exit
    } = tray

    return [
      {
        label: `${version}:${appVersion}`,
        enabled: false
      },
      // {type: 'separator'},
      // {
      //   label: '我在线上',
      //   icon: ImageTool.getOnlineIcon(),
      //   click:  () => {}
      // },
      // {
      //   label: '离开',
      //   icon: ImageTool.getOutlineIcon(),
      //   click:  () => {}
      // },
      // {
      //   label: '请勿打扰',
      //   icon: ImageTool.getSilienceIcon(),
      //   click:  () => {}
      // },
      // {
      //   label: '离线',
      //   icon: ImageTool.getOutlineIcon(),
      //   click:  () => {}
      // },
      {type: 'separator'},
      {
        label: `${update}`,
        icon: ImageTool.getUpdateIcon(),
        click:  () => {
          this.mainWindow.show()
          this.mainWindow.send('show-update')
        }
      },
      // {
      //   label: `${fullscreen}`,
      //   icon: ImageTool.getFullScreenIcon(),
      //   click:  () => {
      //     this.mainWindow.setFullScreen(true)
      //   }
      // },
      {
        label: `${top}`,
        icon: this.getLockIcon(),
        click:  () => {
          this.mainWindow.recycleAlwaysOnTop()
          this.updateTray()
        }
      },
      {type: 'separator'},
      {
        label: `${exit}`,
        icon: ImageTool.getExitIcon(),
        click: () => {
          this.mainWindow.show()
          this.mainWindow.close();
          // this.app.exit(0)
        }
      }
    ]
  }

  getLockIcon(){
    let alwaysOnTop = this.mainWindow.getAlwaysOnTop()
    if(alwaysOnTop){
      return ImageTool.getLockIcon()
    }else{
      return ImageTool.getLockedIcon()
    }
  }

  createTray() {
    let image = ImageTool.getTrayIcon()
    image.setTemplateImage(true)
    let language = ConfigTool.get(ConfigTool.KEY_CUSTOMER_APP_LANGUAGE) || 'zh-CN'

    this.tray = new Tray(image)
    this.contextMenu = Menu.buildFromTemplate(this.getLabels(language))
    this.tray.setContextMenu(this.contextMenu)

    this.tray.setToolTip(WindowConstant.TRAY.TOOLTIP);
    this.initTrayEvent()
  }

  initTrayEvent() {
    this.tray.on('click', () => {
      this.mainWindow.show()
      // this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show()
    })
  }

  initMessageNotify(messageState = this.messageState.YES) {
    this.messageState.current = messageState

    if (messageState) {
      let count = 0;
      this.messageTimer = setInterval(() => {
        count++;
        if (count % 2 == 0) {
          this.tray.setImage(ImageTool.getTrayIcon())
        } else {
          this.tray.setImage(ImageTool.getEmptyIcon())
        }
      }, 500)
    } else {
      clearInterval(this.messageTimer)
    }
  }

  initMessageNotify(flashingState = this.flashingState.YES) {
    this.flashingState.current = flashingState

    if (flashingState) {
      let count = 0;
      this.flashTimer = setInterval(() => {
        count++;
        if (count % 2 == 0) {
          this.tray.setImage(ImageTool.getTrayIcon())
        } else {
          this.tray.setImage(ImageTool.getEmptyIcon())
        }
      }, 500)
    } else {
      clearInterval(this.flashTimer)
    }
  }

  showMessage() {
    this.messageState.current = this.messageState.NO
    clearInterval(this.messageTimer)
    console.log('show message!!')
  }

  responseFlashing() {
    this.flashingState.current = this.flashingState.NO
    clearInterval(this.flashTimer)
  }

  getMessageState() {
    return this.messageState.current
  }

  getFlashingState() {
    return this.flashingState.current
  }

  updateTray(language){
    if(!language){
      language = ConfigTool.get(ConfigTool.KEY_CUSTOMER_APP_LANGUAGE)
    }
    const contextMenu = Menu.buildFromTemplate(this.getLabels(language))
    this.tray.setContextMenu(contextMenu)
  }


  /**
   * 显示一个系统通知(系统托盘气泡)
   * @param options
   * @param options.title<String>
   * @param options.content<String>
   */
  displayBalloon(options){
    this.tray.displayBalloon(options)
  }

  destroy(){
    if(this.tray){
      this.tray.destroy()
    }
  }
}
