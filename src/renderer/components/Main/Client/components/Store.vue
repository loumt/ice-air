<template>
    <div>
        <el-row>
            <el-tag>{{count}}</el-tag>
            <el-button type="success" round @click="setCount">改变数值</el-button>
        </el-row>
    </div>
</template>


<script>
    import {mapActions} from 'vuex'

    export default {
        data(){
            return {
            }
        },
        computed: {
            count() {
                return this.$store.getters.count
            }
        },
        methods:{
            ...mapActions(['setCount'])
        }
    }
</script>