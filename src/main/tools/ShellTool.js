"use strict";

import fs from 'fs'
import os from 'os'
import {shell} from 'electron'

/**
 * Open  External Url
 */
exports.openExternalUrl = (url)=>{
    shell.openExternal(url)
}

/**
 * 系统目录
 */
exports.openOSFolder = (p)=>{
    if(p){
        if(!fs.existsSync(p)) return
    }
    shell.showItemInFolder(p || os.homedir())
}