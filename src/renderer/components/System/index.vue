<template>
    <div>
        <div class="title">Information</div>
        <div class="items">
            <system-info-view></system-info-view>
            <module-version-view></module-version-view>
        </div>
    </div>
</template>

<script>
    import ModuleVersionView from './components/ModuleVersion.vue'
    import SystemInfoView from './components/SystemInfo.vue'

    export default {
        data () {
            return {
                electron: process.versions['atom-shell'],
                name: this.$route.name,
                node: process.versions.node,
                path: this.$route.path,
                platform: require('os').platform(),
                vue: require('vue/package.json').version
            }
        },
        components:{
            SystemInfoView,
            ModuleVersionView
        }
    }
</script>

<style scoped>
    .title {
        color: #888;
        font-size: 18px;
        font-weight: initial;
        letter-spacing: .25px;
        margin-top: 10px;
    }

    .items { margin-top: 8px; }
</style>