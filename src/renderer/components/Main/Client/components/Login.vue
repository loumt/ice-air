<template>
    <div>
        <el-row>
            <el-button type="info" round @click="testLogin">测试登录窗口</el-button>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
            testLogin() {
                this.$bus.$emit('toLogin')
            },
        }
    }
</script>