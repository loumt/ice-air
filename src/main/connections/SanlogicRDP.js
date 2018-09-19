"use strict";

var Q = require('q');
var fs = require('fs');
var os = require('os');
var path = require('path');
var {EventEmitter} = require('events')
var defaults = require('lodash.defaults');
var sanitize = require("sanitize-filename");
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var spawnSync = childProcess.spawnSync;

const mappingStructure = {
    address: {
        def: '',
        name: 'full address:s:'
    },
    username: {
        def: ''
    },
    password: {
        def: ''
    },
    deleteCredentialsAfter: {
        def: true
    },
    safeMode: {
        def: false
    },
    autoReconnect: {
        def: true,
        name: 'autoreconnection enabled:i:',
        fn: arrayMatchTransform([false, true])
    },
    fullscreen: {
        def: true,
        name: 'screen mode id:i:',
        fn: arrayMatchTransform([false, true], 1)
    },
    colors: {
        def: 32,
        name: 'session bpp:i:'
    },
    compression: {
        def: true,
        name: 'compression:i:',
        fn: arrayMatchTransform([false, true])
    },
    connectionType: {
        def: 'auto',
        name: 'connection type:i:',
        fn: arrayMatchTransform(['modem', 'low', 'satellite', 'high', 'wan', 'lan', 'auto'], 1)
    },
    networkAutoDetect: {
        def: true,
        name: 'networkautodetect:i:',
        fn: arrayMatchTransform([false, true])
    },
    bandwidthAutoDetect: {
        def: true,
        name: 'bandwidthautodetect:i:',
        fn: arrayMatchTransform([false, true])
    },
    showWallpaper: {
        def: false,
        name: 'disable wallpaper:i:',
        fn: arrayMatchTransform([true, false])
    },
    fontSmoothing: {
        def: false,
        name: 'allow font smoothing:i:',
        fn: arrayMatchTransform([false, true])
    },
    desktopComposition: {
        def: false,
        name: 'allow desktop composition:i:',
        fn: arrayMatchTransform([false, true])
    },
    showDraggedWindow: {
        def: false,
        name: 'disable full window drag:i:',
        fn: arrayMatchTransform([true, false])
    },
    showMenuAnimations: {
        def: false,
        name: 'disable menu anims:i:',
        fn: arrayMatchTransform([true, false])
    },
    showThemes: {
        def: true,
        name: 'disable themes:i:',
        fn: arrayMatchTransform([true, false])
    },
    showBlinkingCursor: {
        def: true,
        name: 'disable cursor setting:i:',
        fn: arrayMatchTransform([true, false])
    },
    audioPlayMode: {
        def: 'local',
        name: 'audiomode:i:',
        fn: arrayMatchTransform(['local', 'remote', 'none'], 0)
    },
    audioCaptureMode: {
        def: false,
        name: 'audiocapturemode:i:',
        fn: arrayMatchTransform([false, true])
    },
    enableLocalPrinters: {
        def: true,
        name: 'redirectprinters:i:',
        fn: arrayMatchTransform([false, true])
    },
    enableLocalCOMPorts: {
        def: false,
        name: 'redirectcomports:i:',
        fn: arrayMatchTransform([false, true])
    },
    enableSmartCards: {
        def: true,
        name: 'redirectsmartcards:i:',
        fn: arrayMatchTransform([false, true])
    },
    enableClipboard: {
        def: true,
        name: 'redirectclipboard:i:',
        fn: arrayMatchTransform([false, true])
    },
    enablePlugAndPlayDevices: {
        def: '',
        name: 'devicestoredirect:s:'
    },
    enableDrives: {
        def: '',
        name: 'drivestoredirect:s:'
    },
    enablePos: {
        def: false,
        name: 'redirectposdevices:i:',
        fn: arrayMatchTransform([false, true])
    },
    launch: {
        def: '',
        name: 'alternate shell:s:'
    },
    launchWorkingDirectory: {
        def: '',
        name: 'shell working directory:s:'
    }
};
var mapping = {};
for (var key in mappingStructure) {
    mapping[key] = mappingStructure[key].def;
    if (!mappingStructure[key].fn) {
        mappingStructure[key].fn = function (value) {
            return value;
        };
    }
}

function isNumber(value) {
    return (typeof(value) === 'number');
}

function isUndefined(value) {
    return (typeof(value) === 'undefined');
}

function arrayMatchTransform(array, increment, def) {
    return function (value) {
        var index;
        if (isUndefined(increment)) {
            increment = 0;
        }
        if (isNumber(value)) {
            index = value - increment;
        } else {
            index = array.indexOf(value);
        }
        if (index >= 0 && index <= array.length - 1) {
            return index + increment;
        }
        if (isUndefined(def)) {
            return array.length - 1 + increment;
        }
        return def;
    }
}


/**
 * /admin
 * /console 允许当远程连接数达到最大连接时,本次连接会踢掉其中一个连接
 */
class SanlogicRDP extends EventEmitter {
    constructor(config,connectionId) {
        super()
        this.connectionId = connectionId
        this.params = config
    }

    normalize(p){
        return p ? path.normalize(p): '';
    }

    getId(){
        return this.connectionId
    }

    getRdpFileContent(config) {
        defaults(config, mapping);
        var rdpConfigText = '';
        for (var key in config) {
            if (mappingStructure[key] && mappingStructure[key].name) {
                rdpConfigText += mappingStructure[key].name + mappingStructure[key].fn(config[key]) + '\n';
            }
        }
        return rdpConfigText;
    }

    generateFile() {
        var deferred = Q.defer();
        var fileContent = this.getRdpFileContent(this.params);
        var fileName = path.normalize(os.tmpdir() + '/' + sanitize(this.params.address) + '.rdp');

        Q.nfcall(fs.writeFile, fileName, fileContent)
            .then(() => {
                this.emit('generate-file', fileName)
                deferred.resolve(fileName);
            })
            .fail(deferred.reject);
        return deferred.promise;
    }

    deleteRdpCredentials(ip) {
        return spawnSync('cmdkey.exe', ['/delete:TERMSRV/' + ip]);
    }


    storeRdpCredentials(ip, username, password) {
        // when saving credentials, ignore the IP or weird things will happen when multiple OSs are accessed via RDP
        ip = ip.replace(/:.*/g, '');
        return spawnSync('cmdkey.exe', ['/generic:TERMSRV/' + ip, '/user:' + username, '/pass:' + password]);
    }

    cleanup(config, filePath) {
        if (typeof(config.deleteCredentialsAfter) === 'undefined' || config.deleteCredentialsAfter === true) {
            this.deleteRdpCredentials(config.address);
        }
        console.log(filePath);
        // this.deleteRdpFile(filePath);
        return true;
    }

    deleteRdpFile(filePath) {
        fs.unlinkSync(filePath);
    }

    connect(config, filePath) {
        var deferred = Q.defer();
        console.log(filePath)
        // this.proc = spawn('mstsc.exe', [filePath, '/admin', '/v', config.address]);
        this.proc = spawn('mstsc.exe', [filePath, '/console', '/v', config.address]);
        // this.proc = spawn('mstsc.exe', [filePath, '/v', config.address]);

        console.dir(this.proc.pid)
        // when the process is closed, return the control to the pipe
        this.proc.on('exit', ()=>{
            this.emit('exit')
            deferred.resolve(true);
        });

        this.proc.on('close',code=>{
            this.emit('close',code)
        })
        // force the disconnection when the promise is resolved
        deferred.promise.fail(() => {
            if (!this.proc.killed) {
                this.emit('error')
                this.end()
            }
        });
        return deferred;
    }

    startConnect(config, filePath) {
        this.deleteRdpCredentials(config.address);
        this.storeRdpCredentials(config.address, config.username, config.password);

        // connect to the given address
        var deferred = this.connect(config, filePath);

        // after everything, clear the credentials
        deferred.promise.then(function () {
            return this.cleanup(config, filePath);
        });

        // set this to true in order to get the handle of a deferred
        // when calling rdpConnect.
        // By manually rejecting the deferred object you can trigger
        // the closure of the spawned project, thus disconnecting.
        if (!config.safeMode) {
            return deferred.promise;
        }

        return deferred;
    }

  parseParameters(){
        this.params['launch'] = this.normalize(this.params['launch'] )
        this.params['launchWorkingDirectory'] = this.normalize(this.params['launchWorkingDirectory'])
  }

    end(){
        if(this.proc){
            this.proc.kill()
        }
    }

    init() {
        this.parseParameters()

        this.generateFile(this.params).then(filePath => {
            this.startConnect(this.params, filePath);
        }).catch(e => {
            console.log(e)
        });
    }
}
module.exports = SanlogicRDP