const state = {
    count: 100
}

const getters = {
    count : state => state.count
}

const mutations = {
    change(state,v) {
        state.count = v.data
    }
}

const actions = {
    setCount : ({commit})=>{
        commit({type:'change',data: ++ state.count})
    }
}

const module = {

}

export default {
    state,
    getters,
    mutations,
    actions,
    module
}
