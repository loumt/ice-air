"use strict";

const fs= require('fs')
const path = require('path')
const util = require('util')


/**
 * 文件工具类
 */
class FsUtils {

  /**
   * 是否存在
   * @param f
   * @returns {boolean}
   */
  static exist(f) {
    return fs.existsSync(f)
  }


  /**
   * 是否是文件
   * @param f
   * @returns {boolean}
   */
  static isFile(f) {
    return FsUtils.exist(f) && fs.statSync(f).isFile()
  }


  /**
   * 判断是否是Function
   * @param fn
   * @returns {boolean}
   */
  static isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]'
  }

  /**
   * 是否是文件夹
   * @param f
   * @returns {boolean}
   */
  static isDirectory(f) {
    return FsUtils.exist(f) && fs.statSync(f).isDirectory()
  }
  /**
   * 是否是字符串
   * @param f
   * @returns {boolean}
   */
  static isString(fn) {
    return Object.prototype.toString.call(fn) == '[object String]'
  }


  /**
   * 创建目录
   * @param f
   * @param permission
   */
  static mkdir(f, permission) {
    if (util.isArray(f)) {
      f.forEach(function (item) {
        FsUtils.mkdir(item, permission)
      })
    } else {
      if (!FsUtils.exist(f)) {
        fs.mkdirSync(f)
      }
    }
  }

  /**
   * 获取文件状态
   * @param f 文件名
   * @param callback
   */
  static stateSync(f) {
    return fs.statSync(f)
  }

  /**
   * 列出目录下的文件和文件夹
   */
  static list(dir, options, fullView) {
    var result = []
    options = options || {}
    options.sync = true
    FsUtils.each(dir, function (item) {
      if (fullView) {
        result.push(item)
      } else {
        result.push(item.name)
      }
    }, options)
    return result
  }


  static each(dir, callback, options, onComplete) {
    options = options || {}
    dir = dir.replace(/(\/+)$/, '')

    var sync = options.sync != undefined ? options.sync : true
    var excludeFile = options.excludeFile
    var excludeDirectory = options.excludeDirectory
    var matchFunction = options.matchFunction
    var breakFunction = options.breakFunction
    var preventRecursiveFunction = options.preventRecursiveFunction
    var recursive = true
    var checkCount = 0
    var p, i, l

    var onFinished = function () {
      if (checkCount <= 0 && onComplete) {
        onComplete()
      }
    }

    if (options.recursive === false) {
      recursive = false
    }

    if (!FsUtils.isDirectory(dir)) {
      onFinished()
      return []
    }

    var handleItem = function (filename) {
      var name = dir + path.sep + filename
      var isDir = FsUtils.isDirectory(name)
      var stat = FsUtils.stateSync(name)
      //大小
      var info = {
        directory: isDir,
        path: name,
        filename: filename,
        birthTime: stat.birthtime,
        modifyTime: stat.mtime,
        size: stat.size
      }

      if (isDir) {
        if (recursive) {
          if (!preventRecursiveFunction || !preventRecursiveFunction(info)) {
            checkCount++
            FsUtils.each(name, callback, options, function () {
              checkCount--
              onFinished()
            })
          }
        }

        if (!excludeDirectory) {
          if (!matchFunction || (matchFunction && matchFunction(info))) {
            callback(info)
          }
        }
      } else if (FsUtils.isFile(name)) {
        if (!excludeFile) {
          if (!matchFunction || (matchFunction && matchFunction(info))) {
            callback(info)
          }
        }
      }
      checkCount--
      onFinished()
    }
    if (sync) {
      p = fs.readdirSync(dir)
      p.forEach(handleItem)
      checkCount = 0
      onFinished()
    } else {
      fs.readdir(dir, function (e, arr) {
        if (e) {
          onFinished()
        } else {
          checkCount = arr.length
          onFinished()
          arr.forEach(function (item) {
            handleItem(item)
          })

        }
      })
    }
  }

  static copy(f, target, filter_or_newName) {
    var isValid = function (item) {
      if (FsUtils.isDirectory(item)) {
        return true
      }
      if (filter_or_newName) {
        if (util.isRegExp(filter_or_newName)) {
          return filter_or_newName.test(item)
        } else if (FsUtils.isFunction(filter_or_newName)) {
          return filter_or_newName(item)
        }
      }
      return true
    }
    if (util.isArray(f)) {
      f.forEach(function (item) {
        FsUtils.copy(item, target)
      })
    } else {
      var name
      if (!isValid(f)) {
        return
      }
      if (filter_or_newName && FsUtils.isString(filter_or_newName)) {
        name = filter_or_newName
        filter_or_newName = null
      } else {
        name = path.basename(f)
      }
      var newName = path.normalize(target + path.sep + name)
      if (FsUtils.isFile(f)) {
        FsUtils.mkdir(path.dirname(newName))
        FsUtils.copyFile(f, newName)
      } else if (FsUtils.isDirectory(f)) {
        let ta = path.normalize(target + path.sep + path.basename(f))
        FsUtils.mkdir(ta)

        let f_l = FsUtils.list(f, {sync: true, recursive: false}, true)
        f_l.forEach(item => {
          if (item.directory) {
            FsUtils.copy(item.path, ta, filter_or_newName)
          } else {
            FsUtils.copy(item.path, ta, filter_or_newName)
          }
        })


      }
    }
  }

  /**
   * 创建目录(多级)
   * @param fd
   * @returns {boolean}
   */
  static mkdirsSync(fd) {
    if (fs.existsSync(fd)) {
      return true;
    } else {
      if (FsUtils.mkdirsSync(path.dirname(fd))) {
        fs.mkdirSync(fd);
        return true;
      }
    }
  }


  static copyFile(src, dest) {
    var len = 64 * 1024
    var buff = new Buffer(len)
    var fdr = fs.openSync(src, 'r')
    var fdw = fs.openSync(dest, 'w')
    var bytesRead = 1
    var pos = 0
    while (bytesRead > 0) {
      bytesRead = fs.readSync(fdr, buff, 0, len, pos)
      fs.writeSync(fdw, buff, 0, bytesRead)
      pos += bytesRead
    }
    fs.closeSync(fdr)
    fs.closeSync(fdw)
  }

}

module.exports = FsUtils
