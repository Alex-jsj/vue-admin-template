<template>
	<div id="icon">
		<topTooltip :info="'Add and Use'"></topTooltip>
		<ul class="list">
			<li class="item" v-for="(item,index) in iconlIST" :key="index">
				<el-tooltip effect="dark" :content="`<i class='iconfont icon-${item.icon}'></i>`" placement="top">
					<div class="icon-container">
						<i class="iconfont" :class="`icon-${item.icon}`"></i>
						<p class="icon-title">{{item.name}}</p>
					</div>
				</el-tooltip>
			</li>
		</ul>
	</div>
</template>
<script>
import topTooltip from "components/topTooltip";

export default {
	// 图标
	name: "icon",
	data() {
		return {
			loading: false,
			iconlIST: [
				{ name: "search", icon: "search" },
				{ name: "money", icon: "money" },
				{ name: "eye", icon: "look" },
				{ name: "user", icon: "user" },
				{ name: "toge", icon: "toge" },
				{ name: "password", icon: "password" },
				{ name: "filter", icon: "filter" },
				{ name: "female", icon: "female" },
				{ name: "male", icon: "male" },
				{ name: "exam", icon: "exam" },
				{ name: "wechat", icon: "wechat" },
				{ name: "alipay", icon: "alipay" },
				{ name: "union", icon: "union" },
				{ name: "rocket", icon: "rocket" },
				{ name: "download", icon: "download" },
				{ name: "upload", icon: "upload" },
				{ name: "head-portrait", icon: "head-portrait" },
				{ name: "yep", icon: "yep" },
				{ name: "first", icon: "first" },
				{ name: "second", icon: "second" },
				{ name: "third", icon: "third" },
				{ name: "captcha", icon: "captcha" },
				{ name: "fullscreen", icon: "fullscreen" },
				{ name: "time", icon: "time" },
				{ name: "print", icon: "print" },
				{ name: "account", icon: "account" },
				{ name: "close", icon: "close" },
				{ name: "close-bg", icon: "close-bg" },
				{ name: "setting", icon: "setting" },
				{ name: "triangle-top", icon: "triangle-top" },
				{ name: "triangle-bottom", icon: "triangle-bottom" },
				{ name: "triangle-left", icon: "triangle-left" },
				{ name: "triangle-right", icon: "triangle-right" },
				{ name: "right", icon: "right" },
				{ name: "left", icon: "left" },
				{ name: "top", icon: "top" },
				{ name: "bottom", icon: "bottom" },
				{ name: "form", icon: "form" },
				{ name: "zip", icon: "zip" },
				{ name: "pdf", icon: "pdf" },
				{ name: "warn", icon: "warn" },
				{ name: "journal", icon: "journal" },
				{ name: "chart", icon: "chart" },
				{ name: "component", icon: "component" },
				{ name: "in", icon: "in" },
				{ name: "icon", icon: "icon" },
				{ name: "open", icon: "open" },
				{ name: "open-copy", icon: "open-copy" },
				{ name: "home", icon: "home" }
			]
		};
	},
	components: { topTooltip }
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#icon {
	width: 100%;
	.list {
		.item {
			width: 132px;
			height: 110px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			cursor: pointer;
			overflow: hidden;
			border-radius: 4px;
			.transi;
			&:hover {
				background: #f0f2f5;
			}
			.icon-container {
				color: #333;
				.iconfont {
					font-size: 36px;
					display: block;
					margin-bottom: 10px;
				}
				.icon-title {
					font-size: 16px;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
