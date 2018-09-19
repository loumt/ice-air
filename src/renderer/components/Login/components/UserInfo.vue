<template>
    <div>
        <el-row :gutter="20" class="space-top">
            <el-col :span="6" :offset="8" :style="{'margin-top':'10rem'}">
                <div class="grid-content bg-purple">
                    <img src="@/assets/logo.png"/>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="space-top">
            <el-col :span="8" :offset="5">
                <div class="grid-content bg-purple">
                    <el-input :placeholder="$t('login.username')" v-model="username" clearable autofocus="true"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="space-top">
            <el-col :span="8" :offset="5">
                <div class="grid-content bg-purple">
                    <el-input type="password" :placeholder="$t('login.password')" v-model="password" clearable round></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="space-top">
            <el-col :span="8" :offset="5">
                <div class="grid-content bg-purple">
                    <el-button type="primary" round @click="login" size="medium" :style="{width:'13.7rem'}">{{this.$t('login.login')}}</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {login} from './../../../apis/index.js'
    import md5 from 'md5'

    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods:{
            login(){
                this.$router.push('/home/client/appparams')
            }
        }
    }
</script>

<style>
    .space-top{
        margin-top: 1rem;
    }
    .grid-content > input{
        border-radius: 20px;
    }
</style>    
