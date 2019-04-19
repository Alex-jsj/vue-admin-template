<template>
	<div class="echarts">
		<div id="echart-bar"></div>
	</div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
import "echarts-liquidfill/src/liquidFill.js";
export default {
	name: "chartProgress",
	watch: {
		listenMenuCollapse() {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		},
		listenContentWidthType() {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		},
		listenMenuType() {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		}
	},
	computed: {
		// 菜单是否收起
		listenMenuCollapse() {
			return this.$store.state.menuCollapse;
		},
		// 菜单模式
		listenMenuType() {
			return this.$store.state.menuType;
		},
		// 页面宽度
		listenContentWidthType() {
			return this.$store.state.contentWidthType;
		}
	},
	mounted() {
		// init
		this.$nextTick(() => {
			this.the_chart();
		});
	},
	methods: {
		the_chart: function() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById("echart-bar"));
			var value = 0.55;
			var data = [];
			data.push(value);
			data.push(value);
			data.push(value);
			myChart.setOption({
				backgroundColor: "#1b2735",
				title: {
					text: "CPU使用率",
					textStyle: {
						fontWeight: "normal",
						fontSize: 25,
						color: "rgb(97, 142, 205)"
					}
				},
				series: [
					{
						type: "liquidFill",
						radius: "80%",
						data: data,
						backgroundStyle: {
							borderWidth: 5,
							borderColor: "rgb(255,0,255,0.9)",
							color: "rgb(255,0,255,0.01)"
						},
						label: {
							normal: {
								formatter: Number(value * 100).toFixed(1) + "%",
								textStyle: {
									fontSize: 50
								}
							}
						}
					}
				]
			});
			var timer = null;
			window.addEventListener("resize", function() {
				// 防抖处理
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					myChart.resize();
				}, 200);
			});
		}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
.echarts {
	width: 100%;
	height: calc(~"100% - 40px - 10px");
	position: relative;
	margin-top: 10px;
	.no-data {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 12px;
		color: @grey;
	}
	#echart-bar {
		width: 100%;
		height: 600px;
		opacity: 1;
	}
}
</style>
