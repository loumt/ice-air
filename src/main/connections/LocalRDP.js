import RDP from 'node-rdp'
import {EventEmitter} from 'events'

export default class LocalRDP extends EventEmitter {
    constructor(params) {
        super();
        this.params = params;
    }

    init() {
        RDP(this.params).then(this.onclose());
    }

    onclose() {
        this.emit('close')
        return function(deferred){
            // console.dir(deferred)
            // setTimeout(function() {
            //     console.error('Timeout expired, force-killing the connection')
            //     deferred.reject();
            // }, 1000 * 60);
            console.log('At this, point, the connection has terminated.' + new Date());
        }
    }

    instructionParams() {
        return {
            address: this.params['address'],
            username: this.params['username'],
            password: this.params['password'],
        }
    }

    static create(parameters){
        let connection = new LocalRDP(parameters)
        connection.on('close',()=>{})
        connection.init()
    }
}
