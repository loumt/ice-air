<template>
    <div>
        <el-row>
            <el-button type="info" round @click="update">更新</el-button>
        </el-row>
        <el-row>
            <img src="../../../../assets/favicon.ico">
        </el-row>
        <el-row>
            <el-button type="info" round @click="setting">Settings</el-button>
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
    mounted:function(){
      document.addEventListener('dragover', event => event.preventDefault());
      document.addEventListener('drop', event => event.preventDefault());
    },
    methods:{
      update() {
        this.$ipcRenderer.send('update')
      },
      setting(){
        this.$ipcRenderer.send('settings')
      }
    }
  }
</script>