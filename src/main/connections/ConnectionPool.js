import SanlogicRDP from './SanlogicRDP'

export default {
    pool:{},

    new(connectionId,rdpConnection){
        if(connectionId && rdpConnection instanceof SanlogicRDP)
            this.pool[connectionId] = SanlogicRDP
    },

    get(connectionId){
        if(connectionId && connectionId in this.pool)
            return this.pool[connectionId]
        else
            return null
    },

    del(connectionId){
        if(connectionId && connectionId in this.pool){
            delete this.pool[connectionId]
        }
    },

    isHasActive(){
        for(let connectionId in this.pool){
            return connectionId
        }
        return null
    }

}