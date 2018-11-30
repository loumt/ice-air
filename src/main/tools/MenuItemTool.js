"use strict";
import {MenuItem, Menu, app, shell, dialog} from 'electron'

/**
 * WindowBrowser菜单栏
 */
export default class MenuItemTool{
    constructor(){
        this.types = arguments
    }

    /**
     * 分割线
     * @returns {{type: string}}
     */
    separator(){
        return new MenuItem({type: 'separator'})
    }


    getTestMenuItem(){
        return new MenuItem({label:'Test'})
    }


    getElectronMenuItem(){
        return new MenuItem({ label: 'Electron', type: 'checkbox', checked: true })
    }

    /**
     * 取
     */
    fork(){
        let menu = new Menu();
        for(let key in this.types){
            menu.append(this[this.types[key]]())
        }
        return menu
    }
}


MenuItemTool.Type = {
    TEST:'getTestMenuItem',
    ELECTRON:'getElectronMenuItem'
}
