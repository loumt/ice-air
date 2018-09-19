<template>
    <div>
        <el-row>
            <el-button type="info" round @click="toTest">跳转至测试页面</el-button>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                mouseX: 0,
                mouseY: 0
            }
        },
        methods:{
            toTest() {
                this.$router.push('/test')
            }
        }
    }
</script>