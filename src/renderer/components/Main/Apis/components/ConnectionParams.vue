<template>
    <div>
        <el-row>
            <el-tag>URL</el-tag>
            <el-badge>{{api.url}}</el-badge>
        </el-row>
        <el-row>
            <el-tag>Method</el-tag>
            <el-badge>{{api.method}}</el-badge>
        </el-row>
        <el-row>
            <el-tag>参数1:connectionId:</el-tag>
            <el-input v-model="connectionId" placeholder="请输入连接ID"></el-input>
        </el-row>
        <el-row>
            <el-button type="success" round @click="getConnectionParameters">获取连接参数</el-button>
            <el-tag>{{appParams}}</el-tag>
        </el-row>
        <el-row>
            <el-tag>Success</el-tag>
            <el-badge>{{requestResult}}</el-badge>
        </el-row>
        <el-row>
            <el-tag>Response</el-tag>
            <div>{{responseData}}</div>
        </el-row>
        <el-row>
            <el-tag>Error</el-tag>
            <el-badge>{{responseError}}</el-badge>
        </el-row>
    </div>
</template>


<script>
    import {read} from './../../../../storage'

    export default {
        data() {
            return {
                loginState: false,
                loginError: '',
                requestResult: false,
                connectionId:'',
                responseData: {},
                responseError: '',
                api: {
                    url: this.$http.defaults.baseURL + '/:userId/connection/:token',
                    method: 'get'
                }
            }
        },
        methods: {
            getConnectionParameters() {
                console.dir(read('user'))
                this.$http.get(`/${read('userId')}/connection/${this.connectionId}`).then(res => {
                    this.requestResult = true
                    this.responseData = res.data
                }).catch(e => {
                    this.responseError = e
                })
            }
        }
    }
</script>