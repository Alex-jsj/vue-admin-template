<template>
	<div id="fullScreen">
		<i class="iconfont icon-quanping" @click="setFullScreen(true)"></i>
	</div>
</template>

<script>
export default {
	name: "fullScreen",
	data() {
		return {
			isFullScreen: false // 网页全屏
		};
	},
	methods: {
		// 网页全屏
		setFullScreen: function(val) {
			this.isFullScreen = !this.isFullScreen;
			let docElm = document.documentElement; //W3C
			if (this.isFullScreen) {
				var el = document.documentElement;
				var rfs =
					el.requestFullScreen ||
					el.webkitRequestFullScreen ||
					el.mozRequestFullScreen ||
					el.msRequestFullscreen;
				if (typeof rfs != "undefined" && rfs) {
					rfs.call(el);
				}
				return;
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				if (typeof cfs != "undefined" && cfs) {
					cfs.call(el);
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#fullScreen {
	display: table;
	height: 60px;
	margin-right: 20px;
	.iconfont {
		display: table-cell;
		vertical-align: middle;
		color: #fff;
		font-size: 28px;
		cursor: pointer;
        &:hover {
            color: @grey;
            .transi;
        }
	}
}
</style>
