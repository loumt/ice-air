<template>
    <div>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toFileUpload">文件上传测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toSFTP">SFTP协议</el-button>
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
            toFileUpload(){
                this.$router.push('/home/file/fileupload')
            },
            toSFTP(){
                this.$router.push('/home/file/sftp')
            }
        }
    }
</script>