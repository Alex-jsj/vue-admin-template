<template>
	<div
		id="sideBar"
		class="float-left"
		:class="{'is-collapse':isCollapse,'sideBarDark':isDark,'menuType-1':menuType === 1,'menuType-2':menuType === 2,'isFixed':menuFixed}"
	>
		<vue-scroll :ops="ops" v-if="menuType === 1">
			<el-menu
				:default-active="need_path"
				:backgroundColor="isDark?darkConfig.backgroundColor:''"
				:text-color="isDark?darkConfig.textColor:''"
				:active-text-color="isDark?darkConfig.activeTextColor:''"
				class="el-menu-vertical"
				:unique-opened="true"
				:router="true"
				:collapse="isCollapse"
			>
				<template v-for="(item,item_index) in nav">
					<el-submenu :index="item_index+''" v-if="item.children[0]">
						<template slot="title">
							<i class="iconfont" :class="'icon-'+item.icon"></i>
							<span>{{item.title}}</span>
						</template>
						<el-menu-item v-for="(list,child_index) in item.children" :key="child_index" :index="list.url" @click.native="refreshRoute(list)">{{list.title}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="item.url" @click.native="refreshRoute(item)">
						<i class="iconfont" :class="'icon-'+item.icon"></i>
						<span slot="title">{{item.title}}</span>
					</el-menu-item>
				</template>
			</el-menu>
			<div class="menu-open-close" @click="getCollapse()" v-if="menuType==1">
				<p class="text" :class="{'is-rotate':isCollapse}">
					<i class="iconfont" :class="!isCollapse?'icon-open':'icon-open-copy'"></i>
					{{isCollapse ? "" : "收起菜单"}}
				</p>
			</div>
		</vue-scroll>
		<el-menu
			class="el-menu-vertical"
			:class="contentWidthType==='流式'?'content-width-type-1':'content-width-type-2'"
			v-if="menuType === 2"
			:default-active="need_path"
			:backgroundColor="isDark?darkConfig.backgroundColor:''"
			:text-color="isDark?darkConfig.textColor:''"
			:active-text-color="isDark?darkConfig.activeTextColor:''"
			:unique-opened="true"
			:router="true"
			mode="horizontal"
		>
			<template v-for="(item,item_index) in nav">
				<el-submenu :index="item_index+''" v-if="item.children[0]">
					<template slot="title">
						<span>{{item.title}}</span>
					</template>
					<el-menu-item v-for="(list,child_index) in item.children" :key="child_index" :index="list.url" @click.native="refreshRoute(list)">{{list.title}}</el-menu-item>
				</el-submenu>
				<el-menu-item v-else :index="item.url" @click.native="refreshRoute(item)">
					<span slot="title">{{item.title}}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script>
export default {
	name: "sideBar",
	data() {
		return {
			ops: {
				vuescroll: {},
				scrollPanel: {
					scrollingX: false
				},
				rail: {},
				bar: {
					/** 当不做任何操作时滚动条自动消失的时间 */
					showDelay: 1500,
					/** 是否只在滚动的时候现实滚动条 */
					onlyShowBarOnScroll: true,
					/** 是否保持显示*/
					keepShow: false,
					/** 背景色*/
					background: "#c1c1c1",
					/**  透明度  */
					opacity: 0.5,
					/** 当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合*/
					hoverStyle: false,
					/** 是否保持rail显示即使内容高度不足的情况下。 */
					keepShow: false
				}
			},
			darkConfig: {
				backgroundColor: "#545c64",
				textColor: "#fff",
				activeTextColor: "#409EFF"
			}
		};
	},
	computed: {
		need_path: function() {
			if (this.$route.meta.need_path) {
				return this.$route.meta.need_path;
			}
			return this.$route.path;
		},
		nav() {
			return this.$store.state.menu;
		},
		isDark() {
			return this.$store.state.isMenuDark;
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
		visitedViews() {
			return this.$store.state.tagsView.visitedViews;
		}
	},
	methods: {
		// 设置菜单展开收起
		getCollapse() {
			this.$store.commit(
				"SET_MENU_COLLAPSE",
				this.isCollapse ? false : true
			);
		},
		// 点击当前路由刷新当前路由
		refreshRoute: function(val) {
			let routeList = this.visitedViews;
			routeList.map(item => {
				if (item.fullPath === val.url) {
					this.$router.replace({
						path: "/redirect" + item.fullPath
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
@import "~assets/css/mixin.less";
#sideBar {
	width: 100vw;
	background-color: #fff;
	&.menuType-1 {
		width: 14%;
		border-right: 1px solid #e6e6e6;
		height: calc(100vh - 60px);
		position: fixed;
		top: 60px;
		left: 0;
		transition: width 0.3s;
		.__view {
			width: 100% !important;
		}
		.el-menu-vertical {
			border-right: none;
			> li {
				padding: 0 !important;
				// 工作台
				&:first-child {
					margin-top: 8px;
					height: 42px;
					line-height: 42px;
					margin-bottom: 16px;
					&::after {
						content: "";
						display: block;
						width: 90%;
						height: 1px;
						background: rgba(151, 151, 151, 0.2);
						position: absolute;
						bottom: -8px;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
			// 有子菜单的一级菜单
			.el-submenu {
				// 子菜单
				.el-menu {
					.el-menu-item {
						padding: 0;
						padding-left: 80px !important;
						display: block;
					}
					.el-menu-item.is-active {
						background-color: #ecf5ff;
					}
				}
			}
			// 没有子菜单和有子菜单的标题样式
			.el-menu-item,
			.el-submenu__title {
				position: relative;
				height: 50px;
				line-height: 50px;
				span {
					position: absolute;
					left: 56px;
					top: 50%;
					transform: translateY(-50%);
					display: block;
				}
				.iconfont {
					font-size: 22px;
					position: absolute;
					left: 16px;
					top: 0;
				}
				.icon-icon {
					font-weight: 600;
				}
			}
			.el-menu-item.is-active {
				background-color: #ecf5ff;
			}
			&.el-menu--collapse {
				width: 56px;
			}
		}
		.menu-open-close {
			width: 100%;
			height: 40px;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			&:hover {
				&::after {
					background: lighten(@blue, 20%);
				}
				.text {
					color: @blue;
				}
			}
			&::after {
				content: "";
				display: block;
				width: 85%;
				height: 1px;
				background: lighten(#909399, 20%);
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%) translateZ(0);
			}
			.text {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				font-size: 12px;
				padding: 0 8px;
				background: #fff;
				z-index: 1;
				white-space: nowrap;
				color: #909399;
				.iconfont {
					font-size: 12px;
				}
			}
		}
	}
	&.menuType-2 {
		width: 100vw;
		border-bottom: solid 1px #e6e6e6;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		float: inherit;
		position: relative;
		z-index: 1400;
		.el-menu-vertical {
			width: 100%;
			border: none;
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			padding-left: 0.55rem;
			.el-menu-item {
				padding: 0 10px;
			}
			.el-submenu {
				.el-submenu__title {
					padding: 0 10px;
				}
			}
			&.content-width-type-2 {
				width: 1230px;
				margin: 0 auto;
				padding-left: 0;
			}
		}
	}
	&.is-collapse {
		width: 56px;
	}
	&.sideBarDark {
		background-color: #545c64;
		.el-menu-vertical {
			// 有子菜单的一级菜单
			.el-submenu {
				// 子菜单
				.el-menu {
					.el-menu-item.is-active {
						background-color: rgb(67, 74, 80) !important;
					}
				}
			}
			.el-menu-item.is-active {
				background-color: rgb(67, 74, 80) !important;
			}
		}
		.menu-open-close {
			&:hover {
				&::after {
					background: #409eff;
				}
				.text {
					color: #409eff;
				}
			}
			&::after {
				background: #fff;
			}
			.text {
				background: #545c64;
				color: #fff;
			}
		}
	}
	&.isFixed {
		position: fixed;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1400;
	}
}
</style>
