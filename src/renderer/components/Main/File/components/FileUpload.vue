<template>
    <div>
        <el-row>
            <div>分片上传文件</div>
            <div class="upload_box">
                <input type="file" @change="uploadShard"/>
                <el-tag>{{process}}</el-tag>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="process" color="#8e71c7"></el-progress>
                <el-tag>{{uploadMessage}}</el-tag>
            </div>
        </el-row>
        <el-row>
            <div>普通上传文件</div>
            <div>
                <input type="file" @change="uploadNormal"/>
            </div>
            <div>{{uploadNormalResponse}}</div>
            <div>{{uploadNormalError}}</div>
        </el-row>
        <hr/>
        <el-row>
            <div>测试上传文件</div>
            <div>
                <input type="file" @change="uploadTest"/>
            </div>
            <div>{{uploadTestResponse}}</div>
            <div>{{uploadTestError}}</div>
        </el-row>
        <hr/>
        <el-row>
            <div>普通上传文件(Multer)</div>
            <div>
                <input type="file" @change="upload2Normal"/>
            </div>
            <div>{{upload2NormalResponse}}</div>
            <div>{{upload2NormalError}}</div>
        </el-row>
    </div>
</template>

<script>
    import async from 'async'
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {ElRow},
        data(){
            return {
                process: '0',
                uploadMessage: '',
                uploadTestResponse:'',
                uploadTestError:'',
                uploadNormalResponse:'',
                uploadNormalError:'',
                upload2NormalResponse:'',
                upload2NormalError:''
            }
        },
        methods:{
            uploadShard(e) {
                let file = e.target.files[0]
                let {name, size} = file

                let success = 0;  //当前上传数
                let shardSize = 5 * 1024 * 1024;    //以2MB为一个分片
                let shardCount = Math.ceil(size / shardSize);  //总片数

                console.log(`上传的文件名字为 ： ${name}`)
                console.log(`上传的文件大小为 ： ${size}`)
                console.log('上传文件分片数：' + shardCount)

                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                /**
                 * 任务数
                 * @type {Array}
                 */
                var tasks = [];
                for (var i = 0; i < shardCount; ++i) {
                    tasks.push(i);
                }

                NProgress.start()


//                console.log(attr)
                async.eachLimit(tasks, 1, (item, callback) => {
                    //计算上传的文件位置
                    let start = item * shardSize
                    let end = Math.min(size, start + shardSize);

                    let uploadParams = new FormData()
                    uploadParams.append("resources", file.slice(start, end));
                    uploadParams.append("size", size);
                    uploadParams.append("totalShard", shardCount);
                    uploadParams.append("name", name);
                    uploadParams.append("currentShard", item + 1);


                    this.$http.post('http://192.168.20.91:3100/upload/shard', uploadParams, config).then(res => {
                        let rate = ++success / shardCount
                        this.process = Math.round(rate * 100);

                        NProgress.set(rate)
                        if (res.data.message) {
//                            NProgress.done()
                            this.uploadMessage = res.data.message
                        }
                        callback()
                    }).catch(e => {
                        callback(e)
                    })
                }, () => {
                    console.log('上传结束,等待合并')
                })
            },
            uploadNormal(e){
                let param = new FormData()
                param.append('resource', e.target.files[0])
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                this.$http.post('http://192.168.20.91:3100/upload/normal', param, config).then(res => {
                    this.uploadNormalResponse = res.data
                }).catch(e => {
                    this.uploadNormalError = e.data
                })
            },
            uploadTest(e){
                let param = new FormData()
                param.append('resource', e.target.files[0])
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                this.$http.post('http://192.168.20.91:3100/upload/test', param, config).then(res => {
                    this.uploadTestResponse = res.data
                }).catch(e => {
                    this.uploadTestError = e.data
                })
            },
            upload2Normal(e){
                let param = new FormData()
                param.append('resource', e.target.files[0])
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                this.$http.post('http://192.168.20.91:3100/upload/2/normal', param, config).then(res => {
                    this.upload2NormalResponse = res.data
                }).catch(e => {
                    this.upload2NormalError = e.data
                })
            }
        }
    }
</script>