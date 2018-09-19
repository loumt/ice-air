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
            <el-tag>参数1:path:</el-tag>
            <el-input v-model="path" placeholder="请输入路径"></el-input>
        </el-row>
        <el-row>
            <el-tag>参数2:type:</el-tag>
            <el-input v-model="type" placeholder="请输入文件类型"></el-input>
        </el-row>
        <el-row>
            <el-button type="success" round @click="getApplicationForExt">获取文件对应应用列表</el-button>
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
                path:'',
                type:'',
                state:'',
                api: {
                    url: this.$http.defaults.baseURL + '/:userId/application',
                    method: 'get'
                }
            }
        },
        methods: {
            getApplicationForExt() {
                this.$http.get(`/${localStorage.getItem('userId')}/ext/applications?path=${this.path}&type=${this.type}`).then(res => {
                    this.requestResult = true
                    this.responseData = res.data
                }).catch(e => {
                    this.responseError = e
                })
            }
        }
    }
</script>