<template>
	<div id="fixedTools" :class="{'open-tools':isOpen}">
		<!-- 遮罩层 -->
		<div class="shadow-box" @click="isOpen = false;"></div>
		<div class="tools-container">
			<div class="btn-container" data-step="5" data-intro="系统设置">
				<div class="switch-btn the-btn" @click="openTools">
					<i class="iconfont" :class="isOpen?'icon-close-bg':'icon-setting'"></i>
					<span>{{isOpen?'关 闭设 置':'打 开设 置'}}</span>
				</div>
				<div class="backTop-btn the-btn" @click="backToTop">
					<i class="iconfont icon-top"></i>
					<span>回 到顶 部</span>
				</div>
				<div class="goBottom-btn the-btn" @click="goToBottom">
					<i class="iconfont icon-bottom"></i>
					<span>去 到底 部</span>
				</div>
			</div>
			<ul class="tools-list">
				<li class="item">
					<p class="title">整体风格设置</p>
					<el-tooltip effect="dark" content="亮色菜单风格" placement="top">
						<div class="theme-img" @click="themeChange('light')">
							<img src="../../static/img/light.jpg">
							<i class="iconfont icon-yep" v-if="theme === 'light'"></i>
						</div>
					</el-tooltip>
					<el-tooltip effect="dark" content="暗色菜单风格" placement="top">
						<div class="theme-img" @click="themeChange('dark')">
							<img src="../../static/img/dark.jpg">
							<i class="iconfont icon-yep" v-if="theme === 'dark'"></i>
						</div>
					</el-tooltip>
				</li>
				<li class="item">
					<p class="title">导航模式</p>
					<el-tooltip effect="dark" content="侧边菜单布局" placement="top">
						<div class="theme-img" @click="menuChange(1)">
							<img src="../../static/img/menu1.jpg">
							<i class="iconfont icon-yep" v-if="menuType === 1"></i>
						</div>
					</el-tooltip>
					<el-tooltip effect="dark" content="顶部菜单布局" placement="top">
						<div class="theme-img" @click="menuChange(2)">
							<img src="../../static/img/menu2.jpg">
							<i class="iconfont icon-yep" v-if="menuType === 2"></i>
						</div>
					</el-tooltip>
					<br>
					<el-tooltip effect="dark" :disabled="menuType==1" content="侧边菜单布局时可配置" placement="left">
						<div class="inline-item item-collapse">
							<span class="title-2 float-left" :class="{'title-grey':menuType == 2}">导航收起</span>
							<el-switch v-model="isCollapse" :disabled="menuType == 2" class="float-right" :width="30" @change="setMenuCollapse()"></el-switch>
						</div>
					</el-tooltip>
					<el-tooltip effect="dark" :disabled="menuType==2" content="顶部菜单布局时可配置" placement="left">
						<div class="inline-item">
							<span class="title-2 float-left" :class="{'title-grey':menuType == 1}">固定导航</span>
							<el-switch v-model="menuFixed" :disabled="menuType == 1" class="float-right" :width="30" @change="setMenuFixed()"></el-switch>
						</div>
					</el-tooltip>
					<div class="inline-item inline-item-select">
						<span class="title-2 float-left">内容区域宽度</span>
						<el-select v-model="contentWidthType" size="mini" class="select float-right" @change="contentWidthChange">
							<el-option v-for="item in contentWidthTypeList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</li>
				<li class="item">
					<p class="title">页面设置</p>
					<div class="inline-item">
						<span class="title-2 float-left">网页全屏</span>
						<el-switch v-model="isFullScreen" class="float-right" :width="30" @change="setFullScreen()"></el-switch>
					</div>
				</li>
				<li class="item">
					<p class="title">其他设置</p>
					<div class="inline-item">
						<span class="title-2 float-left">色弱模式</span>
						<el-switch v-model="colorWeekOpen" class="float-right" :width="30" @change="setMode('week')"></el-switch>
					</div>
					<div class="inline-item">
						<span class="title-2 float-left">灰度模式</span>
						<el-switch v-model="colorGrayscaleOpen" class="float-right" :width="30" @change="setMode('grayscale')"></el-switch>
					</div>
					<p class="brightness-line"></p>
					<div class="inline-item">
						<span class="title-2 float-left">护眼模式</span>
						<el-switch v-model="colorBrightnessOpen" class="float-right" :width="30" @change="setMode('brightness')"></el-switch>
					</div>
					<div class="inline-item inline-item-select">
						<span class="title-2 float-left">强度选择</span>
						<el-select v-model="brightnessIntensity" :disabled="!colorBrightnessOpen" size="mini" class="select float-right" @change="brightnessIntensityChange">
							<el-option v-for="item in brightnessIntensityList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<el-tooltip effect="dark" content="色弱模式开启时会关闭自动护眼模式功能" placement="left">
						<div class="inline-item">
							<span class="title-2 float-left">夜间21点-凌晨6点自动开启护眼模式</span>
							<el-switch v-model="autoBrightnessOpen" class="float-right" :width="30" @change="saveUserConfig()"></el-switch>
						</div>
					</el-tooltip>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "fixedTools",
	data() {
		return {
			// 默认配置
			isOpen: false,
			theme: "light", // 主题 亮色、暗色
			isFullScreen: false, // 网页全屏
			isCollapse: false, // 导航是否折叠
			menuFixed: false, // 导航是否固定
			contentWidthType: "流式", // 内容区域宽度
			contentWidthTypeList: ["流式"],
			colorWeekOpen: false, //色弱模式
			colorGrayscaleOpen: false, //灰度模式
			colorBrightnessOpen: false, //夜间模式
			brightnessIntensity: "弱",
			brightnessIntensityList: ["弱", "中", "强"],
			autoBrightnessOpen: true, //自动夜间模式
			menuType: 1 // 导航模式 侧边布局 顶部布局
		};
	},
	watch: {
		listenMenuCollapse(newVal) {
			this.isCollapse = newVal;
			this.saveUserConfig();
		}
	},
	computed: {
		listenMenuCollapse() {
			return this.$store.state.menuCollapse;
		},
		account() {
			return this.$store.state.account;
		}
	},
	created() {
		// account
		let config = JSON.parse(
			localStorage.getItem(`${this.account}_mskj_user_config`)
		);
		// 如果本地存储有用户配置 则使用本地的配置
		if (config) {
			for (let key in config) {
				this[key] = config[key];
			}
			// 触发配置生效
			this.themeChange(this.theme);
			this.menuChange(this.menuType);
			this.setMenuCollapse();
			this.setMenuFixed();
			this.contentWidthChange();
			if (this.autoBrightnessOpen) {
				// 自动护眼模式开启
				this.auto_brightness(this.autoBrightnessOpen);
			} else {
				// auto关闭
				if (this.colorWeekOpen) {
					this.setMode("week");
				} else if (this.colorGrayscaleOpen) {
					this.setMode("grayscale");
				} else if (this.colorBrightnessOpen) {
					this.setMode("brightness");
				} else {
					this.setMode();
				}
			}
		} else {
			this.auto_brightness(this.autoBrightnessOpen);
		}
		// 再次存储配置
		this.saveUserConfig();
	},
	methods: {
		// 打开设置菜单
		openTools() {
			this.isOpen = !this.isOpen;
		},
		// 自动护眼模式
		auto_brightness: function(open) {
			this.autoBrightnessOpen = open;
			// 自动护眼模式
			let hour = new Date().getHours();
			// 21-24 1-6
			if (
				(hour > 20 && this.autoBrightnessOpen) ||
				(hour < 7 && this.autoBrightnessOpen)
			) {
				this.$notify({
					title: "温馨提示",
					type: "success",
					dangerouslyUseHTMLString: true,
					message: `
					<p>夜已深，已自动为您打开护眼模式</p>
					<p style="color:#999;">(若不希望自动开启，可点击右侧设置按钮关闭)</p>`,
					duration: 7000
				});
				this.colorBrightnessOpen = true;
				this.setMode("brightness");
				this.saveUserConfig();
			}
		},
		// 护眼模式强度change
		brightnessIntensityChange: function(val) {
			if (val === "弱") {
				document.body.className = "color-brightness-1";
			} else if (val === "中") {
				document.body.className = "color-brightness-2";
			} else if (val === "强") {
				document.body.className = "color-brightness-3";
			}
			this.saveUserConfig();
		},
		// 网页全屏
		setFullScreen: function(val) {
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
		},
		// 改变主题
		themeChange: function(val) {
			this.theme = val;
			if (val === "dark") {
				this.$store.commit("SET_THEME", true);
			} else {
				this.$store.commit("SET_THEME", false);
			}
			this.saveUserConfig();
		},
		// 改变导航模式
		menuChange: function(val) {
			this.menuType = val;
			if (val === 2) {
				this.menuFixed = true;
				this.$store.commit("SET_MENU_FIXED", true);
				this.$store.commit("SET_MENUTYPE", 2);
				this.$store.commit("SET_MENU_COLLAPSE", false);
				this.contentWidthTypeList = ["流式", "定宽"];
			} else {
				this.$store.commit("SET_MENUTYPE", 1);
				this.contentWidthTypeList = ["流式"];
				this.contentWidthType = "流式";
				this.$store.commit("SET_CONTENTWIDTH", this.contentWidthType);
				this.menuFixed = false;
				this.$store.commit("SET_MENU_FIXED", false);
				document.body.style.background = "";
			}
			this.saveUserConfig();
		},
		// 改变导航伸缩
		setMenuCollapse: function() {
			this.$store.commit("SET_MENU_COLLAPSE", this.isCollapse);
			this.saveUserConfig();
		},
		// 改变导航固定方式
		setMenuFixed: function() {
			this.$store.commit("SET_MENU_FIXED", this.menuFixed);
			this.saveUserConfig();
		},
		// 内容布局
		contentWidthChange: function() {
			this.$store.commit("SET_CONTENTWIDTH", this.contentWidthType);
			this.saveUserConfig();
		},
		// 设置模式
		setMode: function(mode) {
			let _mode = mode;
			if (_mode === "week" && this.colorWeekOpen === true) {
				this.colorGrayscaleOpen = false;
				this.colorBrightnessOpen = false;
				this.autoBrightnessOpen = false; // 开启色弱模式则关闭自动护眼功能
				document.body.className = "color-week";
			} else if (
				_mode === "grayscale" &&
				this.colorGrayscaleOpen === true
			) {
				this.colorWeekOpen = false;
				this.colorBrightnessOpen = false;
				document.body.className = "color-grayscale";
			} else if (
				_mode === "brightness" &&
				this.colorBrightnessOpen === true
			) {
				this.colorWeekOpen = false;
				this.colorGrayscaleOpen = false;
				this.brightnessIntensityChange(this.brightnessIntensity);
			} else {
				this.colorWeekOpen = false;
				this.colorGrayscaleOpen = false;
				this.colorBrightnessOpen = false;
				document.body.className = "";
			}
			this.saveUserConfig();
		},
		// 保存用户设置在本地
		saveUserConfig: function() {
			// config
			let config = {
				theme: this.theme,
				isCollapse: this.isCollapse,
				menuFixed: this.menuFixed,
				contentWidthType: this.contentWidthType,
				colorWeekOpen: this.colorWeekOpen,
				colorGrayscaleOpen: this.colorGrayscaleOpen,
				colorBrightnessOpen: this.colorBrightnessOpen,
				autoBrightnessOpen: this.autoBrightnessOpen,
				brightnessIntensity: this.brightnessIntensity,
				menuType: this.menuType
			};
			localStorage.setItem(
				`${this.account}_mskj_user_config`,
				JSON.stringify(config)
			);
		},
		// 回到顶部
		backToTop: function() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		},
		goToBottom: function() {
			document.body.scrollTop = document.body.clientHeight;
			document.documentElement.scrollTop = document.body.clientHeight;
		}
	}
};
</script>

<style lang="less">
@import "~assets/css/mixin.less";
#fixedTools {
	width: 100%;
	height: 0;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	.shadow-box {
		width: 0;
		height: 0;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.3s;
	}
	.tools-container {
		width: 300px;
		position: absolute;
		right: -300px;
		top: 60px;
		height: calc(~"100vh - 60px");
		background: #fff;
		box-shadow: -2px 0 8px rgba(0, 0, 0, 0);
		.transi;
		.btn-container {
			width: 38px;
			position: absolute;
			right: 300px;
			bottom: 20%;
			.the-btn {
				position: relative;
				background: #1890ff;
				width: 38px;
				height: 38px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				pointer-events: auto;
				z-index: 0;
				text-align: center;
				font-size: 16px;
				border-radius: 4px 0 0 4px;
				text-align: center;
				padding: 5px;
				.transi;
				opacity: 0.8;
				margin-top: 1px;
				&:first-of-type {
					margin-top: 0;
				}
				&:hover {
					// background: lighten(#1890ff, 10%);
					.iconfont {
						opacity: 0;
					}
					span {
						opacity: 1;
					}
				}
				&:active {
					background: darken(#1890ff, 10%);
				}
				.iconfont {
					line-height: 38px;
					color: #fff;
					font-size: 18px;
					text-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					opacity: 1;
				}
				span {
					opacity: 0;
					color: #fff;
					font-size: 12px;
					line-height: 14px;
				}
			}
		}
		.tools-list {
			padding: 0 20px 20px 20px;
			.item {
				border-bottom: 1px solid #e8e8e8;
				padding-bottom: 25px;
				padding-top: 25px;
				&::after {
					.clear;
				}
				&:last-of-type {
					border-bottom: none;
				}
				.title {
					font-size: 14px;
					margin-bottom: 25px;
				}
				.theme-img {
					float: left;
					width: 48px;
					height: 42px;
					margin-right: 16px;
					margin-bottom: 3px;
					border-radius: 4px;
					box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
					overflow: hidden;
					cursor: pointer;
					position: relative;
					img {
						width: 100%;
						height: 100%;
						display: block;
					}
					.iconfont {
						position: absolute;
						top: 60%;
						left: 60%;
						transform: translate(-50%, -50%);
						color: @blue;
						font-size: 16px;
					}
				}
				.inline-item {
					width: 100%;
					height: 20px;
					margin-top: 15px;
					.title-2 {
						font-size: 12px;
						color: #666;
						line-height: 20px;
						&.title-grey {
							color: @grey;
						}
					}
					.el-switch {
						.el-switch__core {
							height: 15px;
							&::after {
								height: 11px;
								width: 11px;
							}
						}
						&.is-checked {
							.el-switch__core {
								&::after {
									margin-left: -12px;
								}
							}
						}
					}
					&.inline-item-select {
						height: 28px;
						.title-2 {
							line-height: 28px;
						}
						.select {
							width: 80px;
						}
					}
					&.item-collapse {
						margin-top: 30px;
					}
				}
				.brightness-line {
					width: 100%;
					height: 1px;
					background: #e8e8e8;
					margin-top: 15px;
				}
			}
		}
	}
	&.open-tools {
		height: 100vh;
		.shadow-box {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.1);
		}
		.tools-container {
			right: 0;
			box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
		}
	}
}
</style>
