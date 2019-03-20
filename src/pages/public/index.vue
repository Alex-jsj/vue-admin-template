<template>
	<div class="wrap" :class="{'collapse-wrap':isCollapse,'isFixed':menuFixed,'menuType-2':menuType === 2,'content-width-type-2':contentWidthType==='定宽'}">
		<!-- 顶部信息条 -->
		<topBar></topBar>
		<!-- 侧边菜单 -->
		<sideBar class="side"></sideBar>
		<!-- 右-部分 -->
		<div class="right-wrap float-right">
			<!-- 面包屑 -->
			<crumb></crumb>
			<!-- 多标签 -->
			<tags-view/>
			<!-- 页面容器 -->
			<transition name="fade-transform" mode="out-in">
				<!-- <keep-alive :include="cachedViews"> -->
				<router-view class="views" :key="key"/>
				<!-- </keep-alive> -->
			</transition>
			<!-- 底部 -->
			<p class="footer">Copyright © 2019 陈小银 All Rights Reserved.&nbsp;&nbsp;&nbsp;Tel: +86 15395830398</p>
		</div>
		<!-- 固定右侧工具 -->
		<fixedTools></fixedTools>
	</div>
</template>
<script>
import sideBar from "components/sideBar"; //侧边导航
import topBar from "components/topBar"; //顶部信息
import crumb from "components/crumb"; //面包屑
import TagsView from "components/TagsView"; //标签页
import fixedTools from "components/fixedTools"; //标签页

export default {
	name: "index",
	created() {
		this.$store.dispatch("getCountry");
		this.$store.dispatch("getNation");
		this.$store.dispatch("getCities");
	},
	computed: {
		cachedViews() {
			return this.$store.state.tagsView.cachedViews;
		},
		isCollapse() {
			return this.$store.state.menuCollapse;
		},
		menuFixed() {
			return this.$store.state.menuFixed;
		},
		menuType() {
			return this.$store.state.menuType;
		},
		contentWidthType() {
			return this.$store.state.contentWidthType;
		},
		key() {
			return this.$route.fullPath;
		}
	},
	components: {
		sideBar,
		topBar,
		crumb,
		TagsView,
		fixedTools
	},
	mounted() {
		const that = this;
		this.isZoom();
		window.addEventListener("resize", function() {
			that.isZoom();
		});
	},
	methods: {
		// 浏览器缩放提示 （打开控制台会影响准确度）
		detectZoom: function() {
			let ratio = 0,
				screen = window.screen,
				ua = navigator.userAgent.toLowerCase();
			//
			if (~ua.indexOf("firefox")) {
				if (window.devicePixelRatio !== undefined) {
					ratio = window.devicePixelRatio;
				}
			} else if (~ua.indexOf("msie")) {
				if (screen.deviceXDPI && screen.logicalXDPI) {
					ratio = screen.deviceXDPI / screen.logicalXDPI;
				}
			} else if (
				window.outerWidth !== undefined &&
				window.innerWidth !== undefined
			) {
				ratio = window.outerWidth / window.innerWidth;
			}
			//
			if (ratio) {
				ratio = Math.round(ratio * 100);
			}
			// 360安全浏览器下的innerWidth包含了侧边栏的宽度
			if (ratio !== 100) {
				if (ratio >= 95 && ratio <= 105) {
					ratio = 100;
				}
			}
			return ratio;
		},
		isZoom: function() {
			if (this.detectZoom() < 100 || this.detectZoom() > 100) {
				this.zoomNotifyOpen();
			} else {
				this.zoomNotifyClose();
			}
		},
		zoomNotifyOpen: function() {
			if (!this.isZoomOpen) {
				this.isZoomOpen = true; // 加上标记防止多次提示
				this.instance = this.$notify({
					title: "提示",
					message:
						"你的浏览器目前处于缩放状态，页面可能会出现错位现象，建议100%大小显示",
					type: "info",
					duration: 0
				});
			}
		},
		zoomNotifyClose: function() {
			if (this.instance !== null) {
				// 判断是否为null 防止bug
				this.instance.close();
				this.isZoomOpen = false;
			}
		}
	}
};
</script>

<style lang="less">
/*fade*/
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}
.fade-transform-enter {
	opacity: 0;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>

