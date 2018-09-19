<template>
    <div class="login-page">
        <login-view></login-view>
    </div>
</template>

<script>
    import LoginView from './../components/Login/'

    export default {
        data(){
            return {

            }
        },
        created(){

        },
        components:{
            LoginView
        }
    }
</script>

<style scoped>
    .login-page{
        background-image: url("./../assets/login_bg.jpg");
    }
</style>
