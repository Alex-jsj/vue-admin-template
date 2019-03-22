<template>
	<div id="miniComponent">
		<topTooltip :info="'图片上传'"></topTooltip>
	</div>
</template>
<script>
import topTooltip from "components/topTooltip";
export default {
	// 小组件
	name: "miniComponent",
	data() {
		return {};
	},
	components: { topTooltip },
	created() {},
	methods: {}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";
#imgUpload {
	width: 100%;
}
</style>
