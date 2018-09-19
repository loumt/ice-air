<template>
    <div>
        <el-row>
            <el-button type="info" round @click="getMousePosition">获取鼠标位置</el-button>
            <el-badge>X:{{mouseX}}</el-badge><el-badge>Y:{{mouseY}}</el-badge>
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
            getMousePosition(){
                let position = this.$ipcRenderer.sendSync('mouse-position')
                this.mouseX = position['x']
                this.mouseY = position['y']
            }
        }
    }
</script>