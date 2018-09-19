/**
 * CreateBy loumt@sanlogic.com.
 */
'use strict'
const path = require('path');
const {Menu, Tray, shell} = require('electron');

const version = require('./../../../package.json').version
const DialogTool = require('../tools/DialogTool')
const ShellTool = require('../tools/ShellTool')
const ImageTool = require('../tools/ImageTool')
const WindowConstant = require('./../constants/WindowConstant')
const WindowTool = require('../tools/WindowTool')


class TrapClient {
  constructor({app, mainWindow}) {
    this.app = app
    this.mainWindow = mainWindow
    this.createTray()

    this.messageState = {YES: true, NO: false}
    this.messageState.current = this.messageState.NO

    this.flashingState = {YES: true, NO: false}
    this.flashingState.current = this.flashingState.YES
  }

  getLabels() {
    return [
      {
        label: `版本:${version}`,
        // icon:ImageTool.getVersionIcon(),
        enabled: false
      },
      {type: 'separator'},
      {
        label: '我在线上',
        icon: ImageTool.getOnlineIcon(),
        click:  () => {}
      },
      {
        label: '离开',
        icon: ImageTool.getOutlineIcon(),
        click:  () => {}
      },
      {
        label: '请勿打扰',
        icon: ImageTool.getSilienceIcon(),
        click:  () => {}
      },
      {
        label: '离线',
        icon: ImageTool.getOutlineIcon(),
        click:  () => {}
      },
      {type: 'separator'},
      // {
      //   label: '百度',
      //   icon: ImageTool.getHelpIcon(),
      //   click: function () {
      //     ShellTool.openExternalUrl('http://www.baidu.com')
      //   }
      // },
      // {
      //   label: '文档',
      //   icon: ImageTool.getAboutIcon(),
      //   click: function () {
      //     ShellTool.openExternalUrl('https://electronjs.org/docs')
      //   }
      // },
      {
        label: '更新',
        icon: ImageTool.getUpdateIcon(),
        click:  () => {
          this.mainWindow.send('show-update')
        }
      },
      {
        label: '最大化',
        icon: ImageTool.getFullScreenIcon(),
        click:  () => {
          this.mainWindow.setFullScreen(true)
        }
      },
      {
        label: '锁定',
        icon: ImageTool.getLockIcon(),
        click:  () => {
          this.mainWindow.recycleAlwaysOnTop()
        }
      },
      {
        label: '配置',
        icon: ImageTool.getSettingIcon(),
        click:  () => {
          this.mainWindow.send('show-settings')
        }
      },
      {
        label: '关于',
        icon: ImageTool.getAboutIcon(),
        click: function () {
          DialogTool.showMessage('作者信息', 'Sanlogic')
        }
      },
      {type: 'separator'},
      {
        label: '立即退出',
        icon: ImageTool.getExitIcon(),
        click: () => {
          this.mainWindow.close();
          this.app.exit(0)
        }
      }
    ]
  }

  createTray() {
    let image = ImageTool.getTrayIcon()
    image.setTemplateImage(true)
    this.tray = new Tray(image)
    const contextMenu = Menu.buildFromTemplate(this.getLabels())
    this.tray.setContextMenu(contextMenu)

    this.tray.setToolTip(WindowConstant.TRAY.TOOLTIP);
    // this.initTrayEvent()
  }

  initTrayEvent() {
    this.tray.on('click', () => {
      if (this.messageState.current && this.mainWindow.isVisible()) {
        this.showMessage()
      } else {
        this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show()
      }
    })
    this.tray.on('right-click', () => {
      WindowTool.createWindow({
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        show: true,
        frame: true,
        resizable: false
      })
    })
    this.tray.on('double-click', () => {
      this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show()
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

  playAudio() {
    // var audio = new Audio(__dirname + '/tray/app.wav');
    // audio.play();
    // setTimeout(function(){
    //     console.log("暂停播放....");
    //     audio.pause();// 暂停
    // }, 800)
  }

  destroy(){
    if(this.tray){
      this.tray.destroy()
    }
  }
}

module.exports = TrapClient;
