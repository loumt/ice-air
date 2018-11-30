"use strict";


/**
 * Promise结果集转换
 * @param promise
 * @returns {Promise}
 */
export default class ExtendTool {
  constructor(){}

  static to(promise) {
    return new Promise((resolve, reject) => {
      promise.then(res => {
        resolve([null, res])
      }).catch(err => {
        resolve([err])
      })
    })
  }
}