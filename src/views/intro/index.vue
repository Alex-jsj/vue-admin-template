<template>
	<div id="intro">
		<topTooltip>
			<span>{{$t('intro')}}</span>
			<a href="http://introjs.com" target="_blank" style="color:#66b1ff;">http://introjs.com</a>
		</topTooltip>
		<el-button type="primary" size="small" class="btn my-button" icon="el-icon-question" @click="open_intro">{{$t('introductorPage.text')}}</el-button>
	</div>
</template>


<script>
import topTooltip from "components/topTooltip";

export default {
	// 引导页
	name: "intro",
	data() {
		return {};
	},
	components: { topTooltip },
	methods: {
		open_intro: function() {
			/* {
		 下一步按钮的显示名称 /
			nextLabel: ‘Next →’,
			/ 上一步按钮的显示名称 /
			prevLabel: ‘← Back’,
			/ 跳过按钮的显示名称 /
			skipLabel: ‘Skip’,
			/ 结束按钮的显示名称 /
			doneLabel: ‘Done’,
			/ 引导说明框相对高亮说明区域的位置 /
			tooltipPosition: ‘bottom’,
			/ 引导说明文本框的样式 /
			tooltipClass: ‘’,
			/ 说明高亮区域的样式 /
			highlightClass: ‘’,
			/ 是否使用键盘Esc退出 /
			exitOnEsc: true,
			/ 是否允许点击空白处退出 /
			exitOnOverlayClick: true,
			/ 是否显示说明的数据步骤
			showStepNumbers: true,
			/* 是否允许键盘来操作 /
			keyboardNavigation: true,
			/ 是否按键来操作 /
			showButtons: true,
			/ 是否使用点点点显示进度 /
			showBullets: true,
			/ 是否显示进度条 /
			showProgress: false,
			/ 是否滑动到高亮的区域 /
			scrollToElement: true,
			/ 遮罩层的透明度 /
			overlayOpacity: 0.8,
			/ 当位置选择自动的时候，位置排列的优先级 /
			positionPrecedence: [“bottom”, “top”, “right”, “left”],
			/ 是否禁止与元素的相互关联 /
			disableInteraction: false,
			/ 默认提示位置 /
			hintPosition: ‘top-middle’,
			/ 默认提示内容 
			hintButtonLabel: ‘Got it’
		 } */
			this.$intro()
				.setOptions({
					prevLabel: this.$t("introductorPage.prevLabel"),
					nextLabel: this.$t("introductorPage.nextLabel"),
					skipLabel: this.$t("introductorPage.skipLabel"),
					doneLabel: this.$t("introductorPage.doneLabel"),
					exitOnOverlayClick: false
				})
				.start();
		}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#intro {
	width: 100%;
}
</style>
