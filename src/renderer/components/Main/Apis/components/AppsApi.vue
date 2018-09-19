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
            <el-button type="success" round @click="getApps">获取应用列表</el-button>
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
    export default {
        data() {
            return {
                loginState: false,
                loginError: '',
                requestResult: false,
                responseData: {},
                responseError: '',
                api: {
                    url: this.$http.defaults.baseURL + '/:userId/:groupId/applications',
                    method: 'get'
                }
            }
        },
        methods: {
            getApps() {
                console.log('Get App Params....')
                console.dir(localStorage.getItem('user'))
                this.$http.get(`/${localStorage.getItem('userId')}/0/applications`).then(res => {
                    this.requestResult = true
                    this.responseData = res.data
                }).catch(e => {
                    this.responseError = e
                })
            }
        }
    }
</script>