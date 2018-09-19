<template>
    <div>
        <el-row>
            <el-button type="success" round @click="test">测试</el-button>
        </el-row>
        <el-row>
            <el-button type="success" round @click="getConfig">获取配置</el-button>
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
            test() {
                console.dir(this)
            },
          getConfig(){
              let config = this.$ipcRenderer.sendSync('config-get',['app','is_open_local'])
            console.log(config)
          }
        }
    }
</script>