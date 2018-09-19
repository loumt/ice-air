<template>
    <div>
        <el-row>
            <el-tag>HostName:</el-tag>
            <el-input v-model="hostname" placeholder=""></el-input>
        </el-row>
        <el-row>
            <el-tag>Port:</el-tag>
            <el-input v-model="port" placeholder=""></el-input>
        </el-row>
        <el-row>
            <el-tag>Username:</el-tag>
            <el-input v-model="username" placeholder=""></el-input>
        </el-row>
        <el-row>
            <el-tag>Password:</el-tag>
            <el-input v-model="password" placeholder=""></el-input>
        </el-row>
        <el-row>
            <el-tag>path:</el-tag>
            <el-input v-model="path" placeholder=""></el-input>
        </el-row>

        <el-switch
                v-model="state"
                active-color="#13ce66"
                inactive-color="#ff4949">
        </el-switch>

        <el-row>
            <el-button type="success" round @click="connect">连接</el-button>
        </el-row>

        <el-row>
            <el-button type="success" round :disabled="connection === null" @click="getFileList">获取文件列表</el-button>
        </el-row>

        <el-card class="box-card" v-if="fileList.length !== 0">
            <div v-for="item of fileList" :key="item" class="text item" @click="downloadFile">
                {{'文件名称: ' + item.filename }}
            </div>
        </el-card>
    </div>
</template>

<script>
    import ssh2 from 'ssh2'

    export default {
        data(){
            return {
                state: false,
                hostname:'192.168.3.189',
                port:'22',
                username:'root',
                password:'cloudadm1234!',
                path:'/home',
                fileList:[],
                connection:null
            }
        },
        created(){
        },
        methods:{
            connect(){
                let config = {
                    host:this.hostname,
                    port:this.port,
                    username:this.username,
                    password:this.password
                }
                let Client = ssh2.Client

                let conn = new Client()

                conn.on('ready',()=>{
                    console.log('connection ready....')
                    this.state = true
                    this.connection = conn
                }).connect(config)
            },
            getFileList(){
                this.connection.sftp((err,sftp)=>{
                    if(err){
                        console.log(err)
                    }
                    sftp.readdir(this.path,(err,list)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(list)
                            this.fileList = list
                        }
                    })
                })
            },
            downloadFile(){
                console.log(this.$refs)
                console.log(this.$event)
//                this.connection.sftp((err,sftp)=>{
//                    sftp.fastGet(this.filename,'',downloadError=>{
//                        console.log(downloadError)
//                    })
//                })
//                this.connection.fastGet(this.filename,'F://fs-test',(downloadloadError)=>{
//
//                })
            }
        }
    }
</script>

<style>

</style>