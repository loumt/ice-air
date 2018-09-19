<template>
    <div class="grid-content app-name">
        <img src="@/assets/favicon.ico"/>
        <span>{{this.$t('application')}}</span>
    </div>
</template>

<script>
    export default {
        data: () => ({

        })
    }
</script>


<style>
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

    .app-name {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        position: absolute;
        bottom: 0;
        font-size: 1.5rem;
        color: #3e69a7;
        line-height: 35px;
        text-align: left;
        float: left;
        align-items: center;
        /*text-indent: 10px;*/
    }

    .app-name img {
        /*position: absolute;*/
        text-align: left;
        width: 2rem;
        height: 2rem;
    }

</style>