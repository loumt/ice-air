<template>
    <div class="grid-content">
        <!--刷新-->
        <i class="el-icon-refresh no-drag" @click="reload"
           :title="$t('titleBar.reload')"></i>
        <!--设置-->
        <i class="el-icon-setting no-drag" @click="showSetting"
           :title="$t('titleBar.setting')"></i>
        <!--入菜单栏-->
        <i class="el-icon-minus no-drag" @click="hide" :title="$t('titleBar.hide')"></i>
        <!--最小大化-->
        <!--<i class="el-icon-sort-down no-drag" @click="maxOrMin"-->
        <!--:title="$t('titleBar.max')"></i>-->
        <!--关闭-->
        <i class="el-icon-close no-drag" @click="exit" :title="$t('titleBar.exit')"></i>
    </div>
</template>

<script>
    export default {
        data: () => ({
            show: true,
            application_name: 'CloudApp'
        }),
        created() {

        },
        methods: {
            hide() {
                this.$ipcRenderer.send('window-operation', 'hide')
            },
            maxOrMin() {
                this.$ipcRenderer.send('window-operation', 'max-min')
            },
            exit() {
                this.$ipcRenderer.send('window-operation', 'close')
            },
            reload() {
                this.$ipcRenderer.send('reload')
            },
            showSetting() {
                console.log('show Setting Window!')
            }
        }
    }
</script>

<style scoped>
    div {
        display: block;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        float: right;
        align-items: center;
    }
    .grid-content > i{
        line-height: 30px;
        margin-right: 9px;
    }

    .grid-content > i:hover {
        color: #3e69a7;
    }

    .no-drag {
        -webkit-app-region: no-drag
    }
</style>