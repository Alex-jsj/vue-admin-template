<template>
	<div id="quickEnter">
		<ul class="quick-list">
			<li class="item" v-for="item in quickList" :key="item.title">
				<router-link :to="item.link" class="link">
					<div class="icon-container">
						<i class="iconfont" :class="`icon-${item.icon}`"></i>
					</div>
					<span class="quick-text">{{item.title}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "quickEnter",
	computed: {
		quickList() {
			return [
				{
					title: this.$t("route.introductoryPage"),
					link: "/pages/index/intro",
					icon: "intro"
				},
				{
					title: this.$t("route.icon"),
					link: "/pages/index/icon",
					icon: "icon"
				},
				{
					title: this.$t("route.components.textEditor"),
					link: "/pages/index/component/editor",
					icon: "component"
				},
				{
					title: this.$t("route.chart"),
					link: "/pages/index/intro",
					icon: "chart"
				},
				{
					title: this.$t("route.international"),
					link: "/pages/index/userManage",
					icon: "in"
				}
			];
		}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#quickEnter {
	width: 100%;
	background: #fff;
	margin-bottom: 0.875rem;
	.quick-list {
		margin: 0 auto;
		display: flex;
		justify-content: start;
		flex-flow: row nowrap;
		.item {
			flex: 1 1 auto;
			height: 80px;
			text-align: center;
			padding: 0 15px;
			margin-right: 20px;
			background: #fff;
			border: 1px solid #edeef1;
			position: relative;
			border-radius: 8px;
			.transi;
			&:last-of-type {
				margin-right: 0;
			}
			&:nth-of-type(1) {
				.icon-container {
					.iconfont {
						color: #44c8c5;
					}
				}
			}
			&:nth-of-type(2) {
				.icon-container {
					.iconfont {
						color: #3aa2f4;
					}
				}
			}
			&:nth-of-type(3) {
				.icon-container {
					.iconfont {
						color: #f3566f;
					}
				}
			}
			&:nth-of-type(4) {
				.icon-container {
					.iconfont {
						color: #e6a23c;
					}
				}
			}
			&:nth-of-type(5) {
				.icon-container {
					.iconfont {
						color: #b6a2dc;
					}
				}
			}
			&:hover {
				&:nth-of-type(1) {
					border: 1px solid #44c8c5;
					.icon-container {
						background: #44c8c5;
						.iconfont {
							color: #fff;
						}
					}
					.quick-text {
						color: #44c8c5;
					}
				}
				&:nth-of-type(2) {
					border: 1px solid #3aa2f4;
					.icon-container {
						background: #3aa2f4;
						.iconfont {
							color: #fff;
						}
					}
					.quick-text {
						color: #3aa2f4;
					}
				}
				&:nth-of-type(3) {
					border: 1px solid #f3566f;
					.icon-container {
						background: #f3566f;
						.iconfont {
							color: #fff;
						}
					}
					.quick-text {
						color: #f3566f;
					}
				}
				&:nth-of-type(4) {
					border: 1px solid #37bea3;
					.icon-container {
						background: #37bea3;
						.iconfont {
							color: #fff;
						}
					}
					.quick-text {
						color: #37bea3;
					}
				}
				&:nth-of-type(5) {
					border: 1px solid #b6a2dc;
					.icon-container {
						background: #b6a2dc;
						.iconfont {
							color: #fff;
						}
					}
					.quick-text {
						color: #b6a2dc;
					}
				}
			}
			.link {
				width: 100%;
				height: 100%;
				display: flex;
			}
			.icon-container {
				width: 60px;
				height: 60px;
				border-radius: 5px;
				display: inline-block;
				margin: 10px 0;
				.transi;
				.iconfont {
					font-size: 40px;
					text-align: center;
					line-height: 60px;
					display: inherit;
					.transi;
				}
			}
			.quick-text {
				width: calc(~"100% - 60px");
				display: inline-block;
				font-size: 20px;
				line-height: 80px;
				text-align: center;
				color: @grey_2;
				letter-spacing: 2px;
			}
		}
	}
}
</style>
