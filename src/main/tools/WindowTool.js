const {BrowserWindow} = require('electron')
const WindowConstant = require('./../constants/WindowConstant')

class RendererWindow {
    constructor(windowOptions) {
        this.newWindow = new BrowserWindow(windowOptions)
    }

    initTimeOut() {
        setTimeout(() => {
            this.newWindow.close()
        }, 5000)
    }
}


class WindowTools {
    static createWindow(windowOptions) {
        return new RendererWindow(windowOptions)
    }

    static createTrayWindow() {
        let rendererWindow = new RendererWindow(WindowConstant.TRAY_WINDOW)
    }
}

module.exports = WindowTools