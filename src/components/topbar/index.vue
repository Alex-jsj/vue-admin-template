<template>
	<!-- contentWidthType==='流式'?'content-width-type-1':'content-width-type-2' -->
	<div id="topBar" :class="{'content-width-type-1':contentWidthType==='流式','content-width-type-2':contentWidthType==='定宽','menuType-2':menuType===2}">
		<div class="content-width-box">
			<!-- 左侧文字信息 -->
			<logo class="float-left"></logo>
			<!-- 右侧用户信息 -->
			<userBoard class="float-right"></userBoard>
			<!-- 语言切换 -->
			<switchLang class="float-right"></switchLang>
			<!-- 全屏 -->
			<fullScreen class="float-right"></fullScreen>
		</div>
	</div>
</template>
<script>
import switchLang from "./switchLang";
import fullScreen from "./fullScreen";
import userBoard from "./userBoard";
import logo from "./logo";
export default {
	name: "topBar",
	components: {
		switchLang,
		fullScreen,
		userBoard,
        logo
	},
	computed: {
		contentWidthType() {
			return this.$store.state.contentWidthType;
		},
		menuType() {
			return this.$store.state.menuType;
		}
	}
};
</script>

<style lang="less">
@import "~assets/css/mixin.less";
#topBar {
	width: 100vw; // 防抖处理
	height: 60px;
	background: #292c31;
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1500;
	.content-width-box {
		width: 100%;
		height: 100%;
		padding: 0 20px;
	}
	&.content-width-type-1.menuType-2 {
		.content-width-box {
			position: relative;
		}
	}
	&.content-width-type-2.menuType-2 {
		.content-width-box {
			width: 1230px;
			height: 100%;
			margin: 0 auto;
			position: relative;
			padding: 0;
		}
	}
}
</style>
