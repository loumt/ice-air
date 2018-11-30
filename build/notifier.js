"use strict";

const _ = require('lodash')
const path = require('path')
const notifier = require('node-notifier');
const ICON = path.resolve(__dirname, './icon.ico');

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
module.exports = (options) => {
    let parameters = {}
    _.assign(parameters, {icon: ICON}, options)
    notifier.notify(parameters,(err,response)=>{});

    notifier.on('click', function(notifierObject, options) {
        // Triggers if `wait: true` and user clicks notification
    });

    notifier.on('timeout', function(notifierObject, options) {
        // Triggers if `wait: true` and notification closes
    });
}

