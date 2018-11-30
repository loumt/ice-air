"use strict";
import IpcBase from'./IpcBase'
import {exec} from'child_process'
import ConnectionPool from'./../../connections/ConnectionPool'
import SanlogicRDP from'./../../connections/SanlogicRDP'
import PluginExtend from'./../../plugins/lib'

export default class IpcLocalRDP extends  IpcBase{
  constructor(mainWindow){
    super(mainWindow)
  }

  openLocalRDP() {
    return (e, args) => {
      // console.log(args)
      let config = args
      let connectionId = args['token']


      let connection = new SanlogicRDP(config, connectionId)

      //不管连接成功与否,该进程都会先生成.
      //置入池中,用于控制客户端的关闭限制
      ConnectionPool.new(connectionId, connection)

      connection.on('build',(args)=>{
        console.log('RDP FILE :' + args['file'])
      }).on('exit',()=>{

      }).on('close', () => {
        this.mainWindow.send('connection-close', connectionId)
        ConnectionPool.del(connectionId)
      }).on('error',()=>{

      })

      connection.init();
    }
  }


  //SANRCP://192.168.20.50:10001?192.168.3.100@5900
  openLocalRCP(){
    return (e,rcpURL)=>{
      if(rcpURL.indexOf('SANRCP:')!== -1 && PluginExtend.rcpPath()){
        exec(`${PluginExtend.rcpPath()} ${rcpURL.split('SANRCP://')[1]}`)
      }
    }
  }


  static getInstance(mainWindow) {
    return new IpcLocalRDP(mainWindow)
  }

}
