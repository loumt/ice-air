/**
 * Ipc相关常量
 * 1.Ipc消息指令
 * 2.指定函数
 */
export default class IpcConstants{}

IpcConstants.Instruction = {
  ClipBoard:{
    Get:["get-clipboard","getClipboard"], //获取
    Set:["set-clipboard","setClipboard"]
  },
  Window:{
    Operation:["window-operation","operation"],
    FullScreen:["window-full-screen","setFullScreen"],
    ShowWindow:["page-ready","showWindow"],
    Reload:['reload','reload'],
    Login:['login','login'],
    LoginState:['get-login-state','getLoginState']
  },
  Tray:{
    GetMessageState : ['message-state','messageState'],
    GetFlashState : ['flash-state','flashState'],
    ReceiveMessage:['receive-message','receiveMessage'],
    Notification:['notification','notification'],
  },
  Others:{
    Console:['console','console'],
    AllowToLogout:['allow-logout','allowLogout'],
    RightClickMenu:['right-click','rightClickMenu'],
    ClickVersion:['get-client-version','getClientVersion']
  },
  Update:{
    Update:['update','update'],
    UpdateBackend:['update-backend','updateBackend'],
    VersionInfo:['versions','getVersionInfo']
  },
  Config:{
    Get:['config-get','getConfig'],
    Set:['config-set','setConfig'],
    Save:['config-save','saveConfig'],
    SetLanguage:['set-language','setLanguage'],
    GetLanguage: ['get-language','getLanguage']
  },
  System:{
    GetAccentColor:['get-accent-color','getAccentColor'],
    Exit:['exit','exit']
  },
  LocalRdp:{
    LocalRdp:['local-rdp','openLocalRDP'],
    LocalRcp:['local-rcp','openLocalRCP'],
  }
}
