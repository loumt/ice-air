"use strict";
const _ = require('lodash')

/**
 * 对象工具
 */
class ObjectUtils {
  constructor() {
  }


  static spread(keys, value) {
    let b = {}
    b[keys[keys.length - 1]] = value
    let ks = keys.slice(0, keys.length - 1)
    ks.reverse()
    for (let i = 0; i < ks.length; i++) {
      let o = {};
      o[ks[i]] = b;
      b = o;
    }
    return b
  }

  /**
   * 组装对象
   * @param params<Object>
   *
   *   key: 'key.key.key.key' <String>
   *   value: value  <~>
   */
  static assignProperties(params) {
    let result = {}

    if (typeof params === 'object') {
      for (let key in params) {
        _.merge(result, ObjectUtils.spread(key.split('.'), params[key]))
      }
    }
    return result
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
   * 判断是否是Function
   * @param fn
   * @returns {boolean}
   */
  static isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]'
  }
}

module.exports = ObjectUtils

// let config = {
//   //cloudapp 服务
//   'server': {
//     protocol: 'http',
//     hostname: '192.168.16.66',
//     port: '3020'
//   },
//   //广告服务
//   'ad': {
//     protocol: 'http',
//     hostname: '192.168.3.184',
//     port: '8000'
//   },
//   //用户相关
//   'customer': {
//     //窗体设置
//     window: {
//       fullScreen: true,
//       width: 1024,
//       height: 768,
//       silence: false,
//       noice: false
//     },
//     //应用设置
//     app: {
//       is_open_local: false,
//       show_ad: true,
//       ad_show_times: 20 * 1000
//     }
//   }
// }


// (function test() {
//   const KEY_SERVER = 'server'
//   const KEY_SERVER_PROTOCOL = 'server.protocol'
//   const KEY_SERVER_HOSTNAME = 'server.hostname'
//   const KEY_SERVER_PORT = 'server.port'
//
//   const KEY_AD = 'ad'
//   const KEY_AD_PROTOCOL = 'ad.protocol'
//   const KEY_AD_HOSTNAME = 'ad.hostname'
//   const KEY_AD_PORT = 'ad.port'
//
//   const KEY_CUSTOMER = 'customer'
//   const KEY_CUSTOMER_WINDOW_FULLSCREEN = 'customer.window.fullScreen'
//   const KEY_CUSTOMER_WINDOW_WIDTH = 'customer.window.width'
//   const KEY_CUSTOMER_WINDOW_GEIGHT = 'customer.window.height'
//   const KEY_CUSTOMER_WINDOW_SILENCE = 'customer.window.silence'
//   const KEY_CUSTOMER_WINDOW_NOICE = 'customer.window.noice'
//
//   const KEY_CUSTOMER_APP_IS_OPEN_LOCAL = 'customer.app.is_open_local'
//   const KEY_CUSTOMER_APP_SHOW_AD = 'customer.app.show_ad'
//   const KEY_CUSTOMER_APP_AD_SHOW_TIMES = 'customer.app.ad_show_times'

  // function hr(title) {
  //   if (title) {
  //     console.log('-------' + title + '--------')
  //   } else {
  //     console.log('---------------')
  //   }
  //
  // }
  //
  // function spread(keys, value) {
  //   let b = {}
  //   b[keys[keys.length - 1]] = value
  //   let ks = keys.slice(0, keys.length - 1)
  //   ks.reverse()
  //   for (let i = 0; i < ks.length; i++) {
  //     let o = {};
  //     o[ks[i]] = b;
  //     b = o;
  //   }
  //   return b
  // }


  // console.dir(spread('sanlogic.person.tech.low.name'.split('.'), 'Loumt'))

//   let result = {}
//
//   const test = {
//   }
//
//   test[KEY_SERVER_PROTOCOL] = 'http'
//   test[KEY_SERVER_HOSTNAME] = '192.168.16.66'
//   test[KEY_SERVER_PORT] = 3020
//   test[KEY_AD_HOSTNAME] = '192.168.3.184'
//   test[KEY_AD_PORT] = '8000'
//   test[KEY_CUSTOMER_APP_AD_SHOW_TIMES] = 2000
//
//
//   console.log(ObjectUtils.assignProperties(test))
//
// })()


