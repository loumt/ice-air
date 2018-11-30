<template>
    <div>
        <el-row>
            <el-button type="text" icon="el-icon-error" @click="toAppParams">获取应用参数API</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toRdp">打开RDP连接</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toClipboard">客户端剪贴板</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="trayMessage">托盘消息测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="mousePosition">鼠标位置测试</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="storeTest">Store</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="loginModel">登录模态框</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toTest">测试页面</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="test">测试页面</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toLogin">登录页面</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toUpdate">更新页面</el-button>
        </el-row>
        <el-row>
            <el-button type="text" icon="el-icon-success" @click="toFile">文件测试</el-button>
        </el-row>
    </div>
</template>

<script>
  export default {
    methods: {
      toAppParams() {
        this.$router.push('/home/client/appparams')
      },
      toRdp() {
        this.$router.push('/home/client/rdpconnect')
      },
      toClipboard() {
        this.$router.push('/home/client/clipboard')
      },
      toFileUpload() {
        this.$router.push('/home/client/fileupload')
      },
      trayMessage() {
        this.$router.push('/home/client/receivemessage')
      },
      mousePosition() {
        this.$router.push('/home/client/mouseposition')
      },
      storeTest() {
        this.$router.push('/home/client/store')
      },
      loginModel() {
        this.$router.push('/home/client/loginmodel')
      },
      toTest() {
        this.$router.push('/home/client/totest')
      },
      toLogin() {
        this.$router.push('/home/client/tologin')
      },
      test() {
        this.$router.push('/home/client/test')
      },
      toUpdate() {
        this.$router.push('/home/client/update')
      },
      toFile() {
        this.$router.push('/home/client/file')
      }
    }
  }
</script>