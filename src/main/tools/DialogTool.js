const {app,dialog} = require('electron')
const ImageTool = require('./ImageTool')

/**
 * 弹框
 */
class DialogTool {
    constructor() {
    }

    static quitConfirm(){
        dialog.showMessageBox({
            type: 'question',
            buttons: ['确认','取消'],
            title: '确认',
            message: 'CloudApp',
            detail: '请问您要立刻退出么?',
            icon: ImageTool.getWindowIcon(),
            defaultId: 1,
            cancelId: 1
        }, (btnIndex) => {
            if (btnIndex === 0) {
                app.exit(0);
            }
        })
    }


    static updateConfirm() {
        dialog.showMessageBox({
            type: 'info',
            title: 'Found Updates',
            message: 'Found updates, do you want update now?',
            buttons: ['Sure', 'No']
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
                console.log('To update!!');
            }
        })
    }

    static showMessage(title,message){
        dialog.showMessageBox({
            type: 'info',
            title: title,
            message: message
        })
    }

    static errorDialog(title,content){
        dialog.showErrorBox(title, content);
    }
}

module.exports = DialogTool