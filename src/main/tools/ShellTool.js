"use strict";

const fs =require('fs')
const os =require('os')
const {shell} =require('electron')

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