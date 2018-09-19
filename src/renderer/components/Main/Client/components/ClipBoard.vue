<template>
    <div>
        <el-row>
            <el-tag>{{clipboardTest}}</el-tag>
            <el-button type="success" round @click="getClipBoard">测试剪贴板</el-button>
            <el-tag>{{clipboardText}}</el-tag>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                clipboardTest: 'Clip Board Test!',
                clipboardText: 'No',
            }
        },
        methods:{
            getClipBoard() {
                this.clipboardText = this.$ipcRenderer.sendSync('get-clipboard')
            }
        }
    }
</script>