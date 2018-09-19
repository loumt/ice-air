<template>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="客户端功能测试" name="client">
            <client-view></client-view>
        </el-collapse-item>
        <el-collapse-item title="API测试" name="apitest">
            <api-test-view></api-test-view>
        </el-collapse-item>
        <el-collapse-item title="个人测试" name="private">
            <native-view></native-view>
        </el-collapse-item>
        <el-collapse-item title="文件测试" name="file">
            <file-view></file-view>
        </el-collapse-item>
        <el-collapse-item title="WindowApis" name="native">
            <native-view></native-view>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    import ClientView from './components/Client.vue'
    import ApiTestView from './components/ApiTest.vue'
    import FileView from './components/File.vue'
    import PrivateView from './components/Private.vue'
    import NativeView from './components/Native.vue'
    export default {
        components: {
            ClientView,
            ApiTestView,
            NativeView,
            PrivateView,
            FileView
        },
        data() {
            return {
                activeNames: ['apitest']
            };
        },
        methods: {
            handleChange(val) {
//                console.log(val);
            }
        }
    }
</script>