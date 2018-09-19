<template>
    <div>
        <el-row>
            <el-button type="info" round @click="update">更新</el-button>
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
      update() {
        this.$ipcRenderer.send('update')
      }
    }
  }
</script>