<template>

    <el-container>
        <el-aside width="200px">
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
        </el-aside>
        <el-main class="drag">
            <el-row v-for="item in fileList">{{item}}</el-row>
        </el-main>
    </el-container>
</template>


<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data() {
      return {
        imageUrl: '',
        fileList:[
          'Drop File Here!!'
        ]
      };
    },
    mounted : function () {
      document.addEventListener('drop',(e) => {
        e.preventDefault();
        e.stopPropagation();

        for (let file of e.dataTransfer.files) {
          let {name, path,size} = file
          this.fileList.push(`文件名:${name} 路径:${path} 大小:${size}`)
        }
      });
      document.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .drag {
        border: 1px dashed #d9d9d9;
        text-align: center;
    }

</style>