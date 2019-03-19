<template>
	<div id="imgUpload">
		<topTooltip :info="'图片上传'"></topTooltip>
		<photoUpload :ajax_address="uploadUrl" v-on="{upload_success:uploadSuccess}"></photoUpload>
	</div>
</template>
<script>
import topTooltip from "components/topTooltip";
// 图片上传组件
import photoUpload from "components/photoUpload";
export default {
	// 图片上传
	name: "imgUpload",
	data() {
		return {
			uploadUrl: "/"
		};
	},
	components: { photoUpload, topTooltip },
	created() {
		this.layeyi();
	},
	methods: {
		// 图片上传
		uploadSuccess: function(res) {
			this.form.photo = res;
		},
		layeyi: function() {}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#imgUpload {
	width: 100%;
}
</style>
