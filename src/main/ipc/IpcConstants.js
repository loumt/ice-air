/**
 * Ipc相关常量
 * 1.Ipc消息指令
 */
class IpcConstants{}

IpcConstants.Instruction = {
  ClipBoard:{
    Get:["get-clipboard","getClipboard"],
    Set:["set-clipboard","setClipboard"]
  },
  Window:{
    Operation:["window-operation","operation"],
    FullScreen:["window-full-screen","setFullScreen"],
    ShowWindow:["page-ready","showWindow"],
    Reload:['reload','restore'],
    Login:['login','login'],
    LoginState:['get-login-state','getLoginState']
  },
  Tray:{
    GetMessageState : ['message-state','messageState'],
    GetFlashState : ['flash-state','flashState'],
    ReceiveMessage:['receive-message','receiveMessage']
  },
  Others:{
    Console:['console','console'],
    AllowToLogout:['allow-logout','allowLogout'],
    LocalRdp:['local-rdp','openLocalRDP'],
    RightClickMenu:['right-click','rightClickMenu'],
    ClickVersion:['get-client-version','getClientVersion'],
    VersionInfo:['versions','getVersionInfo']
  },
  Mouse:{
    Position:['mouse-position','mousePosition']
  },
  Update:{
    Update:['update','update'],
    UpdateBackend:['update-backend','updateBackend']
  },
  Config:{
    Get:['config-get','getConfig'],
    Set:['config-save','setConfig']
  }
}

module.exports = IpcConstants