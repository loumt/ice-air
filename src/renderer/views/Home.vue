<template>
    <el-container>
        <!--Login Model-->
        <login-model-view></login-model-view>

        <el-aside :style="{'width':'200px','border-right':'solid 1px #8e71c7'}">
            <aside-view></aside-view>
        </el-aside>

        <el-main :style="{'height':'100%'}">
            <!--<main-view></main-view>-->
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import async from 'async'
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'
    import LoginModelView from './../components/LoginModel/'
    import AsideView from './../components/Aside/'

    export default {
        data() {
            return {
            }
        },
        mounted(){
            this.$bus.$on('login',res=>{
                console.dir(res)
            })
        },
        components: {
            LoginModelView,
            AsideView,
        },
        methods: {
        }
    }
</script>

<style scoped>
    body {
        border: 4px solid #000000;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b981;
    }
</style>
