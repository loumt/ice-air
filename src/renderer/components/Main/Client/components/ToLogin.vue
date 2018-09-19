<template>
    <div>
        <el-row>
            <el-button type="success" round @click="toLoginPage">登录页面</el-button>
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
            toLoginPage() {
                this.$router.push('/login')
            }
        }
    }
</script>