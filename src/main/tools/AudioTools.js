"use strict";

const  path = require('path')
const {nativeImage} = require('electron')
const assertsPath = process.env.NODE_ENV === 'development' ?
    path.join(__dirname,'./../asserts/audio') : path.join(__dirname,'/cast/audio')

class AudioTools{
    constructor(){
    }

    static messageNotice(filename){
        return nativeImage.createFromPath(path.join(assertsPath,filename))
    }
}
