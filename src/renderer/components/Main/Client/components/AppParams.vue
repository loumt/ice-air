<template>
    <div>
        <el-row>
            <el-button type="success" round @click="getAppParams">获取应用数据</el-button>
            <el-tag>{{appParams}}</el-tag>
        </el-row>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                appParams:{}
            }
        },
        methods:{
            getAppParams(){
                console.log('Get App Params....')
            }
        }
    }
</script>