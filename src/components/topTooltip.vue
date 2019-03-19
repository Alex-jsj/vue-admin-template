<template>
	<div id="topTooltip">
		<div v-html="info"></div>
	</div>
</template>
<script>
export default {
	name: "topTooltip",
	props: {
		info: String
	}
};
</script>

<style lang="less">
@import "~assets/css/mixin.less";
#topTooltip {
	width: 100%;
    background: #eaedf4;
    padding: 15px 10px;
    font-size: 14px;
    color: #333;
	margin-bottom: 20px;
}
</style>
