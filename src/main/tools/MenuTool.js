"use strict";


import {BrowserWindow, app,Menu, shell, dialog} from 'electron'

/**
 * WindowBrowser菜单栏
 */
export default class MenuTool{
    constructor(){
        this.types = arguments
    }

    /**
     * 分割线
     * @returns {{type: string}}
     */
    separator(){
        return {type: 'separator'}
    }


    getEditMenu(){
        let editMenu = {
            label: '编辑',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            }]
        }
        return editMenu
    }


    getViewMenu(){
        let viewMenu = {
            label: 'View',
            submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        // on reload, start fresh and close any old
                        // open secondary windows
                        if (focusedWindow.id === 1) {
                            BrowserWindow.getAllWindows().forEach(win => {
                                if (win.id > 1) win.close()
                            })
                        }
                        focusedWindow.reload()
                    }
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            }, {
                type: 'separator'
            }, {
                label: 'App Menu Demo',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        const options = {
                            type: 'info',
                            title: 'Application Menu Demo',
                            buttons: ['Ok'],
                            message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
                        }
                        dialog.showMessageBox(focusedWindow, options, function () {})
                    }
                }
            }]
        }
        return viewMenu
    }
    getWindowMenu(){
        let windowMenu  =  {
            label: 'Window',
            role: 'window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                type: 'separator'
            }, {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: () => {
                    app.emit('activate')
                }
            }]
        }
        return windowMenu;
    }


    getHelpMenu (){
        let helpMenu = {
            label: 'Help',
            role: 'help',
            submenu: [{
                label: 'Learn More',
                click: () => {
                    shell.openExternal('http://electron.atom.io')
                }
            }]
        }
        return helpMenu
    }


    /**
     * 取
     */
    fork(){
        let result = [];
        for(let key in this.types){
            result.push(this[this.types[key]]())
        }
        return Menu.buildFromTemplate(result)
    }
}


MenuTool.Type = {
    EDIT:'getEditMenu',
    VIEW:'getViewMenu',
    WINDOW:'getWindowMenu',
    HELP:'getHelpMenu'
}
