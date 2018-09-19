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
            <el-tag>参数2:state:</el-tag>
            <el-input v-model="state" placeholder="请输入连接状态"></el-input>
        </el-row>
        <el-row>
            <el-button type="success" round @click="setConnectionState">设置连接状态</el-button>
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
    export default {
        data() {
            return {
                requestResult: false,
                responseData: {},
                responseError: '',
                connectionId:'',
                state:'',
                api: {
                    url: this.$http.defaults.baseURL + '/:userId/connection/:connectionId',
                    method: 'put'
                }
            }
        },
        methods: {
            setConnectionState() {
                this.$http.put(`/${localStorage.getItem('userId')}/connection/${this.connectionId}`,{state:this.state}).then(res => {
                    this.requestResult = true
                    this.responseData = res.data
                }).catch(e => {
                    this.responseError = e
                })
            }
        }
    }
</script>