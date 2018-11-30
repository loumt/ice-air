'use strict';
import axios from 'axios'
import fs from 'fs'
import del from 'del'
import url from 'url'
import path from 'path'
import {EventEmitter} from 'events'
import FsUtils from './../utils/FsUtils'
import ConfigTool from './../tools/ConfigTool'
import ConfigConstant from'./../constants/ConfigConstant'
import ExtendTool from './../tools/ExtendTool'

const UPDATE_FILE_BASE_PATH = '/versions/version.json'

//文件更新目录
const UPDATE_TARGET = 'resources\\app\\dist\\electron'

//旧版本存储目录
const OLD_VERSION_DIR = 'resources'

let backup = path.join(path.dirname(require('electron').app.getPath('exe')), OLD_VERSION_DIR)
let target = path.join(path.dirname(require('electron').app.getPath('exe')), UPDATE_TARGET)

/////更新在Dev模式下不可用

/**
 * Server(config.server):
 * version file:{static}/version.json
 * ---------
 * version.json
 * {
 *  "v1.0.1":{
        "version":"v1.0.1",//版本信息
        "publisher": "loumt@sanlogic.com",//发布人
        "date":"2018-05-27 11:25:52",//发布时间
        "detail":["remark1","remark2",....],//版本更新
        "files":["111","",""]//更新文件{such as ['app/index.css','style/222.css'....] or ['all'] or ['css'/'js'/'images']}
  }
 * }
 * ---------
 */

/**
 * 更新组件
 *
 * Events
 * 1.update-success : 更新成功
 * 2.update-error : 更新错误
 * 3.update-total : 更新文件总数
 * 4.update-file-end : 更新单个文件结束
 * 5.update-deny : 无需更新
 */
export default class UpdateHandler extends EventEmitter {
  constructor() {
    super();
    this.fileInSuccessUpdateNum = 0;
    this.totalUpdateFileNum = 0;
    this.updateToVersion = '';
    this.currentVersion = this.getCurrentVersion();

    //文件备份
    this.originVersionFolder = target
    this.backupFolder = this.join(backup, this.currentVersion)
  }

  join() {
    return path.join(...arguments)
  }

  /**
   * 获取当前设定的服务器地址
   */
  static getServerUrl() {
    return url.format(ConfigTool.get(ConfigConstant.KEY_SERVER))
  }

  /**
   * 获取当前版本(deprecation)
   */
  getCurrentVersion() {
    return ConfigTool.get(ConfigConstant.KEY_CURRENT_VERSION)
  }

  /**
   * 获取旧版本号
   * @returns {*}
   */
  getOlderVersion() {
    return ConfigTool.get(ConfigTool.KEY_OLD_VERSION)
  }

  /**
   * 获取服务最新版本号
   */
  async getRemoteVersion() {
    let [err, result] = await ExtendTool.to(this.getRemoteVersionJson())
    if (err) {
      this.emit('update-error', '获取服务器版本信息失败')
    }
    return result ? result['current-version'] : ''
  }

  /**
   * 获取远程服务器上JSON文件
   */
  getRemoteVersionJson() {
    return axios({
      method: 'get',
      url: UpdateHandler.getServerUrl() + '/versions/version.json',
      responseType: 'json'
    })
  }

  /**
   * 获取远程服务器版本信息及是否更新
   */
  static getVersionInfo() {
    return new Promise((resolve, reject) => {
      let server_url = UpdateHandler.getServerUrl()
      let result = {};

      axios({
        method: 'get',
        url: server_url + UPDATE_FILE_BASE_PATH,
        responseType: 'json',
        timeout: 3000
      }).then(res => {
        result['lastestVersionInfo'] = res.data[res.data['current-version']];
        result['lastestVersion'] = res.data['current-version'];

        let currentVersion = ConfigTool.get(ConfigConstant.KEY_CURRENT_VERSION)
        result['currentVersion'] = currentVersion

        result['isUpdate'] = currentVersion !== result['lastestVersion']
        resolve(result)
      }).catch(e => {
        result['error'] = {code: 500}
        reject(result)
      });
    });
  }

  /**
   * 更新
   */
  update() {
    this.emit('update-start')

    //判断更新环境，暂且只支持客户端整合环境
    if (process.env.NODE_ENV === 'development') {
      return this.emit('update-error', '当前环境为开发模式!')
    }

    //获取服务器地址
    try {
      let serverOptions = ConfigTool.get(ConfigTool.KEY_SERVER);
      this.server = url.format(serverOptions)
    } catch (e) {
      return this.emit('update-error', '服务地址获取失败!')
    }

    //比对远程服务器版本与客户端版本
    if(!this.compareVersion()){
      return this.emit('update-deny', '无需更新')
    }

    //将就版本文件存储在旧版本文件目录中
    this.backup()

    //获取最新版本
    let versionInfoPromise = UpdateHandler.getVersionInfo();
    versionInfoPromise.then((versionInfo) => {

      //获取服务器上最新的版本
      let lastestVersionInfo = versionInfo['lastestVersionInfo'];

      let version = lastestVersionInfo['version'];
      let files = lastestVersionInfo['files']
      let date = lastestVersionInfo['date']
      let detail = lastestVersionInfo['detail']
      let publisher = lastestVersionInfo['publisher']

      this.updateToVersion = version;
      console.log(`******************************`);
      console.log(`****version : ${version}******`);
      console.log(`****date    :    ${date}******`);
      console.log(`****detail  :  ${detail}******`);
      console.log(`******************************`);

      //文件个数
      let sum = 0;
      for (let type in files) {
        sum += files[type].length;
      }
      this.totalUpdateFileNum = sum;
      this.emit('update-total', sum)

      //更新文件
      for (let fileType in files) {
        switch (fileType) {
          case 'static':
            this.staticHandler(files[fileType]);
            break;
          case 'views':
            this.viewHandler(files[fileType]);
            break;
          default:
            console.log('unsurpport!');
            break;
        }
      }
    })
  }


  /**
   * 比对服务器版本与本地客户端版本
   * @returns {Promise|boolean}
   * true : 可以更新客户端
   */
  compareVersion(){
    let remoteVersion = this.getRemoteVersion()
    return remoteVersion && remoteVersion !== this.getCurrentVersion()
  }

  staticHandler(staticFiles) {
    if (!staticFiles && staticFiles.length === 0) {
      return;
    }
    //设置下载路径
    let fileTo = target;
    staticFiles.forEach(item => {
      let fileDm = {}
      fileDm['from'] = this.server + '/versions' + '/' + item;
      fileDm['to'] = path.join(fileTo, item)

      // updateFiles.push(fileDm);
      this.downloadFiles(fileDm)
    })

    // console.log(updateFiles);
  }

  viewHandler(viewFiles) {
    if (!viewFiles && viewFiles.length === 0) {
      return;
    }

    //设置下载路径
    let fileTo = path.join(__dirname, '..');
    viewFiles.forEach(item => {
      let fileDm = {}
      fileDm['from'] = this.server + '/versions' + '/' + item;
      fileDm['to'] = path.join(fileTo, item)
      this.downloadFiles(fileDm)
    })
  }


  downloadFiles({from: url, to: projectLocation}) {
    console.log('to : ' + projectLocation)
    let options = {
      method: 'get',
      url: url,
      responseType: 'stream'
    }
    axios(options)
      .then(response => {
        let fileStream = response.data;

        response.data.on('end', () => {
          this.fileInSuccessUpdateNum++;
          this.emit('update-file-end')
        })
        response.data.on('close', () => {
        })
        FsUtils.mkdirsSync(path.dirname(projectLocation))
        fileStream.pipe(fs.createWriteStream(projectLocation))
      }).catch(e => {
      console.log(e);
    });
  }

  /**
   * 设置/获取 当前版本号(本地json文件存储版本号)
   * @param version
   */
  localVersion(version) {
    let file = path.join('./', 'version.json');
    if (version) {
      let v = {};
      v['currentVersion'] = version;
      let str = JSON.stringify(v)
      fs.writeFileSync(file, str);
    } else {
      let localVersion = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
      return localVersion['currentVersion'];
    }
  }

  updateVersionSettings() {
    ConfigTool.save(ConfigTool.KEY_OLD_VERSION, this.currentVersion)
    ConfigTool.save(ConfigTool.KEY_CURRENT_VERSION, this.updateToVersion)
  }

  /**
   * 获取当前下载完成百分比
   */
  getUpdatePercent() {
    let percent = parseFloat(this.fileInSuccessUpdateNum / this.totalUpdateFileNum) * 100;

    //完成更新
    if (percent === 100) {
      //更新配置文件最新版本号
      this.updateVersionSettings()
      this.emit('update-success')
    }
    return percent
  }


  /**
   * 备份旧版本文件(更新文件前)
   */
  backup() {
    //检测是否存在上一版本,存在即删除
    let olderV = ConfigTool.get(ConfigTool.KEY_OLD_VERSION)
    if(olderV && FsUtils.exist(this.join(backup,olderV))){
      this.clearFolder(this.join(backup,olderV))
    }

    if (FsUtils.exist(this.backupFolder)) {
      del.sync([this.backupFolder], {force: true})
    }

    //1.备份
    this.filesToFolder(this.originVersionFolder,this.backupFolder)
    //2.清除客户端文件
    this.clearFolder(this.originVersionFolder)
  }

  /**
   * 清理文件
   */
  clearFolder(targetFolder) {
    del.sync([targetFolder], {force: true})
  }

  /**
   * 还原版本文件(更新失败或者用户主动触发)
   * params:
   * 1.userOperation是否为用户行为,默认非用户行为
   */
  restore(userOperation = false) {
    if(userOperation){
      return this.emit('restore-error','DEV NOT SUPPORT BACKEND!')
    }
    let oldVersionFolder = this.join(backup, userOperation ? this.getOlderVersion() : this.currentVersion)
    if(!FsUtils.exist(oldVersionFolder)){
      return this.emit('restore-error','回退版本失败,无备份版本文件')
    }
    this.clearCurrentVersion()
    this.restoreOldVersion(oldVersionFolder)
    del.sync(oldVersionFolder, {force: true})
  }

  /**
   * 清除当前版本
   */
  clearCurrentVersion() {
    let delList = []
    fs.readdirSync(this.originVersionFolder).forEach(item => {
      delList.push(this.join(this.originVersionFolder, item))
    })
    del.sync(delList, {force: true})
  }

  /**
   * 还原旧版本文件
   */
  restoreOldVersion(versionFolder) {
    this.filesToFolder(versionFolder,this.originVersionFolder)
  }

  /**
   *  文件转移
   */
  filesToFolder(fromFolder,toFolder){
    //1.创建备份目录
    FsUtils.mkdir(this.backupFolder)

    //2.文件拷贝
    fs.readdirSync(fromFolder).forEach(item => {
      FsUtils.copy(this.join(fromFolder, item), toFolder)
    })
  }

  /**
   * 更新错误处理
   */
  updateErrorHandler(fun = this.restore) {
    if(fun && typeof fun === 'function'){
      fun()
    }
    this.emit('update-error')
  }
}

