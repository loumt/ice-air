<template>
    <div>
        <el-row>
            <el-button type="success" round @click="testRdp">测试RDP连接</el-button>
            <el-tag>{{rdpState}}</el-tag>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                rdpState: 'No Connection',
            }
        },
        mounted(){
            this.$ipcRenderer.on('connection-close', (e, args) => {
                this.rdpState = `ConnectionId : ${args} end.....`
            })
        },
        methods:{
            testRdp() {
                this.rdpState = 'running.....'
                this.$ipcRenderer.send('local-rdp', {
                    address: '192.168.3.103',
                    username: 'loumt@sanlogic.com',
                    password: '123456',
                    launch: 'notepad.exe',
                    launchWorkingDirectory: 'C:\\Windows\\System',
                    token: '1726'
                })
            }
        }
    }
</script>