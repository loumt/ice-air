<template>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" width="340px" :close-on-click-modal="false"
               custom-class="login-dialog">
        <div class="login-body">
            <i class="icon el-icon-service"></i>
            <div class="from">
                <div class="input-items">
                    <div class="input-box">
                        <el-input :autofocus="true" v-model="username" clearable :placeholder="$t('login.username')">
                            <i slot="prefix" class="el-input__icon el-icon-news"></i>
                        </el-input>
                    </div>
                    <div class="input-box border-t">
                        <el-input v-model="password" type="password" clearable :placeholder="$t('login.password')">
                            <i slot="prefix" class="el-input__icon el-icon-goods"></i>
                        </el-input>
                    </div>
                </div>
                <div class="btns">
                    <el-button type="danger" @click="login" :loading="loading">立即登录</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                phone: '',
                password: '',
                loading: false,
                dialogVisible: false
            }
        },
        mounted() {
            this.$bus.$on('toLogin',res =>{
                this.dialogVisible = true
            })
        },
        methods: {
            login() {
                this.$bus.$emit('login',{
                    username:this.username,
                    password:this.password
                })

                this.dialogVisible = false
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .login-body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-body > .icon {
        color: #f56c6c;
        font-size: 80px;
    }

    .from {
        width: 260px;
        margin-top: 50px;
    }

    .from > .input-items {
        background: white;
        border: 1px solid #f0f0f0;
        border-radius: 2px;
        overflow: hidden;
    }

    .from > .input-box {
        display: flex;
        align-items: center;
    }

    .from > .input-box > .l-icon {
        width: 40px;
        height: 40px;
    }

    .l-icon > i {
        font-size: 20px;
        color: #999;
    }

    .from > .input-box > .el-input__inner {
        border: none;
        padding: 0;
    }

    .from > .border-t {
        border-top: 1px solid #f0f0f0;
    }

    .from > .btns {
        margin-top: 30px;
        margin-bottom: 100px;
    }

    .from > .btns > button {
        width: 100%;
    }
</style>
