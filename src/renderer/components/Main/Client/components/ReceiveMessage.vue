<template>
    <div>
        <el-row>
            <el-button type="info" round @click="receiveMessage">收到消息</el-button>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {}
        },
        methods:{
            receiveMessage(){
                this.$ipcRenderer.send('receive-message')
            }
        }
    }
</script>