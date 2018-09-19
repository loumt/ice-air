<template>
    <div>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="loginApi">登录接口测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="appsApi">应用获取接口测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="appParamApi">应用参数接口测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="connectionState">连接状态接口测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="extApplications">文件名获取打开应用列表</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="connectionParameters">连接参数获取</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        methods: {
            loginApi(){
                this.$router.push('/home/apis/loginapi')
            },
            appsApi(){
                this.$router.push('/home/apis/appsapi')
            },
            appParamApi(){
                this.$router.push('/home/apis/appparamapi')
            },
            connectionState(){
                this.$router.push('/home/apis/connectionstate')
            },
            extApplications(){
                this.$router.push('/home/apis/extapplications')
            },
            connectionParameters(){
                this.$router.push('/home/apis/connectionparameters')
            }
        }
    }
</script>