"use strict";

import IpcBase from './IpcBase'
import {systemPreferences} from 'electron'

export default class IpcSystem extends IpcBase {
  constructor(app,tray) {
    super({app,tray})
  }

  /**
   * 获取系统颜色偏好
   * @returns RGBA 十六进制形式.
   */
  getAccentColor() {
    return (e) => {
      systemPreferences.getAccentColor()
    }
  }


  exit(){
    return (e)=>{
      this.tray.destroy()
      this.app.exit(0)
    }
  }

  languageHandler(){
    return (e,type)=>{

    }
  }


  static getInstance(app,tray) {
    return new IpcSystem(app,tray)
  }

}
