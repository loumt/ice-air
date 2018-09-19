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
            <el-tag>参数1:appId:</el-tag>
            <el-input v-model="appId" placeholder="请输入应用ID"></el-input>
        </el-row>
        <el-row>
            <el-tag>参数1:path:</el-tag>
            <el-input v-model="path" placeholder="请输入文件路径"></el-input>
        </el-row>
        <el-row>
            <el-tag>参数1:type:</el-tag>
            <el-input v-model="type" placeholder="请输入文件类型"></el-input>
        </el-row>
        <el-row>
            <el-button type="success" round @click="getAppParams">获取应用参数</el-button>
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
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {ElRow},
        data() {
            return {
                requestResult: false,
                responseData: {},
                responseError: '',
                appId:'',
                path:'',
                type:'',
                api: {
                    url: this.$http.defaults.baseURL + '/:userId/connection',
                    method: 'get'
                }
            }
        },
        methods: {
            getAppParams() {
                this.$http.get(`/${localStorage.getItem('userId')}/connection?appId=${this.appId}&path=${this.path}&type=${this.type}`).then(res => {
                    this.requestResult = true
                    this.responseData = res.data
                }).catch(e => {
                    this.responseError = e
                })
            }
        }
    }
</script>