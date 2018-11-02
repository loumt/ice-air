"use strict";

const _ = require('lodash')
const path = require('path')
const notifier = require('node-notifier');
const ICON = path.resolve(__dirname, 'logo.ico');

/**
 * title
 * message
 * subtitle
 * sound
 * wait
 * contentImage
 * timeout
 * closeLabel
 * actions
 * dropdownLabel
 * reply
 * @param options
 * doc:https://www.npmjs.com/package/node-notifier
 */
let Notification = (options) => {
    notifier.notify(_.assign({icon: ICON,timeout:5000}, options),(err,response)=>{});

    notifier.on('click', function(notifierObject, options) {
        // Triggers if `wait: true` and user clicks notification
    });

    notifier.on('timeout', function(notifierObject, options) {
        // Triggers if `wait: true` and notification closes
    });
}


exports.ElectronNotification = (options)=>{
  Notification(_.assign({
    title:'Electron'
  },options))
}

exports.ServerNotification = (options)=>{
  Notification(_.assign({
    title:'Server'
  },options))
}

