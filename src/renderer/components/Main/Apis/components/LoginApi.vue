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
            <el-tag>参数1:username:</el-tag>
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-row>
        <el-row>
            <el-tag>参数2:password:</el-tag>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
        </el-row>
        <el-row>
            <el-button type="success" round @click="loginAction">登录测试</el-button>
        </el-row>
        <el-row>
            <el-tag>Success</el-tag>
            <el-badge>{{loginState}}</el-badge>
        </el-row>
        <el-row>
            <el-tag>Response</el-tag>
            <div>{{loginData}}</div>
        </el-row>
        <el-row>
            <el-tag>Error</el-tag>
            <el-badge>{{loginError}}</el-badge>
        </el-row>
    </div>
</template>

<script>
    import {save} from './../../../../storage'

    export default {
        data(){
            return {
                loginState: false,
                loginData: {},
                username:'loumt',
                password:'123456',
                loginError: '',
                api:{
                    url: this.$http.defaults.baseURL + '/login',
                    method:'post'
                }
            }
        },
        methods:{
            loginAction(){
                console.log('Login....')
                this.$http.post('/login',{
                    username:this.username,
                    password:this.password
                }).then((res)=>{
                    this.loginState = true
                    this.loginData = res.data
                    save('userId',res.data.userId)
                    save('username',res.data.username)
                }).catch(e=>{
                    this.loginError = e
                })
            }
        }
    }
</script>