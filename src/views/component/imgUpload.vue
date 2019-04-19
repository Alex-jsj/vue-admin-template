<template>
    <div id="imgUpload">
        <topTooltip>{{$t('imgUpload.toolTip')}}</topTooltip>
        <p class="title">{{$t('imgUpload.title1')}}</p>
        <photoUpload :ajax_address="uploadUrl" v-on="{upload_success:uploadSuccess}"></photoUpload>
        <p class="title" style="margin-top:50px;">{{$t('imgUpload.title2')}}</p>
        <cropper :config="uploadConfig" :id="'id1'"></cropper>
    </div>
</template>
<script>
import topTooltip from "components/topTooltip";
// 图片上传组件
import photoUpload from "components/photoUpload";
import cropper from "components/cropper";
export default {
    // 图片上传
    name: "imgUpload",
    data() {
        return {
            uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
            uploadConfig: {
                ajaxAddress: `https://jsonplaceholder.typicode.com/posts/`,
                autoCropWidth: 200,
                autoCropHeight: 200
            }
        };
    },
    components: { photoUpload, topTooltip, cropper },
    methods: {
        // 图片上传
        uploadSuccess: function(res) {
            this.form.photo = res;
        }
    }
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#imgUpload {
    width: 100%;
    .title {
        padding: 8px 10px;
        border-bottom: 1px solid @grey;
        margin-bottom: 20px;
        font-size: 16px;
    }
}
</style>
