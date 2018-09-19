"use strict";

const  path = require('path')
const {nativeImage} = require('electron')
const assertsPath = process.env.NODE_ENV === 'development' ?
    path.join(__dirname,'./../asserts') : path.join(__dirname,'/cast')


class ImageTools{
    constructor(){
    }

    static assert(iconName){
        return nativeImage.createFromPath(path.join(assertsPath,iconName))
    }

    //window icon
    static getWindowIcon(){
        return ImageTools.assert('favicon.ico')
    }

    //tray icon
    static getTrayIcon(){
        return ImageTools.assert('favicon.ico')
    }

    static getAboutIcon(){
        return ImageTools.assert('about-16.png')
    }

    static getSettingIcon(){
        return ImageTools.assert('setting-16.png')
    }

    static getHelpIcon(){
        return ImageTools.assert('help-16.png')
    }

    static getExitIcon(){
        return ImageTools.assert('close-16.png')
    }

    static getVersionIcon(){
        return ImageTools.assert('menu-16.png')
    }

    static getUpdateIcon(){
        return ImageTools.assert('update-16.png')
    }

    static getMessageIcon(){
        return ImageTools.assert('message.ico')
    }

    static getEmptyIcon(){
        return ImageTools.assert('empty.ico')
    }

  static getFullScreenIcon(){
    return ImageTools.assert('full-screen-16.png')
  }

  static getLockIcon(){
    return ImageTools.assert('lock-16.png')
  }


  //state
    static getOnlineIcon(){
      return ImageTools.assert('online-16.png')
    }

  static getOutlineIcon(){
    return ImageTools.assert('outline-16.png')
  }

  static getSilienceIcon(){
    return ImageTools.assert('silence-16.png')
  }

  static getLiveIcon(){
    return ImageTools.assert('live-16.png')
  }


}

module.exports = ImageTools