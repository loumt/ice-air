<template>
    <div class="row-bg drag">
        <el-row>
            <el-col :span="12">
                <logo-view></logo-view>
            </el-col>
            <el-col :span="12" :offset="12">
                <menu-view></menu-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import LogoView from './components/Logo.vue'
    import MenuView from './components/Menu.vue'

    export default {
        data: () => ({
            application_name: 'CloudApp'
        }),
        components:{
            LogoView,
            MenuView
        },
        methods: {

        }
    }
</script>

<style scoped>
    div {
        display: block;
    }
    .row-bg {
        padding: 5px;
        background-color: #f9fafc;
    }
    .drag {
        -webkit-app-region: drag
    }
</style>