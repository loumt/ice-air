<template>
    <div id="app">
        <el-container>
            <el-header>
                <header-component></header-component>
            </el-header>
            <el-main>
                <router-view :style="{height:'97%',width:'100%'}"></router-view>
            </el-main>
        </el-container>
        <!--other modal-->
    </div>
</template>

<script>
    import HeaderComponent from './components/Header/'

    export default {
        data() {
            return {}
        },
        created() {

        },
        components: {
            HeaderComponent
        }
    }
</script>
 

<style>
    .el-main {
        height: 750px;
    }
</style>