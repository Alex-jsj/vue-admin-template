
<template>
    <div id="photoUpload" class="public-pages">
        <el-upload class="avatar-uploader" :class="{'allready_upload':hasUpload}" :http-request="handleUpload" accept="image/jpeg,image/png,image/jpg,image/bmp" :action="ajax_address" list-type="picture-card">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
        </el-upload>
        <el-progress type="circle" class="upload-progress" v-if="progress" :percentage="progress" :status="(progress == 100)?'success':''"></el-progress>
    </div>
</template>

<script>
export default {
    // 考生照片上传组件
    name: 'photoUpload',
    data() {
        return {
            headers: { Authorization: `token ${localStorage.getItem('admin_token')}` },
            hasUpload: false,
            progress: 0,
            imageUrl: '' // 照片上传
        };
    },
    props: {
        ajax_address: '',
        photo: ''
    },
    created() {
        if (this.photo) {
            this.imageUrl = this.photo;
            this.hasUpload = true;
        }
    },
    methods: {
        // 自定义上传
        handleUpload: function(param) {
            let fd = new FormData(); //通过form数据格式来传
            fd.append('file', param.file); //传文件
            this.hasUpload = true; // 开始上传隐藏上传背景图
            this.$http({
                method: 'post',
                url: this.ajax_address,
                data: fd,
                headers: this.headers,
                onUploadProgress: progressEvent => {
                    var complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                    this.progress = complete;
                }
            })
                .then(res => {
                    let respon = res.data || '';
                    this.progress = 0;
                    if (respon.code === 200) {
                        this.imageUrl = URL.createObjectURL(param.file);
                        this.hasUpload = true;
                        // 返回数据
                        this.$emit('upload_success', respon.data.id);
                    } else if (respon.code === 422) {
                        this.hasUpload = false;
                        this.$message.error(`${respon.code}:${respon.errors.file.map(item => item)}`);
                    }
                })
                .catch(err => {
                    this.$message.error(`${err.response.status} : 服务器错误!`);
                    this.progress = 0;
                    this.hasUpload = false;
                });
        }
    }
};
</script>

<style lang="less">
@import '~assets/css/mixin.less';
#photoUpload {
    position: relative;
    .avatar-uploader {
        width: 5.16rem;
        min-width: 206px;
        height: 6.88rem;
        min-height: 275px;
        display: block;
        border: 1px solid rgba(233, 233, 233, 1);
        position: relative;
        overflow: hidden;
        .transi;
        &:hover {
            border-color: lighten(#4771ff, 15%);
        }
        .el-upload {
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0;
            border: none;
            background: url('../../static/img/upload.png') no-repeat;
            background-size: 100% 100%;
        }
        .el-upload-list__item {
            width: 100%;
            height: 100%;
            border-radius: 0;
            border: none;
        }
        .avatar {
            width: 100%;
            height: 100%;
            display: block;
        }
        &.allready_upload {
            .el-upload {
                background: transparent;
            }
        }
    }
    .upload-progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 5.16rem;
        min-width: 206px;
        height: 6.88rem;
        min-height: 275px;
        .el-progress-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
