<template>
	<div class="echarts">
		<div id="echart-bar"></div>
	</div>
</template>

<script>
import "../../../static/data/china.js";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// map
require("echarts/lib/chart/map");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
	name: "chartBar",
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
			let data = [
				{ name: "梅州", value: [116.1, 24.55, 5] },
				{ name: "上海", value: [121.48, 31.22, 5] },
				{ name: "攀枝花", value: [101.718637, 26.582347, 5] },
				{ name: "承德", value: [117.93, 40.97, 5] },
				{ name: "太仓", value: [121.1, 31.45, 5] },
				{ name: "曲靖", value: [103.79, 25.51, 5] },
				{ name: "烟台", value: [121.39, 37.52, 5] },
				{ name: "福州", value: [119.3, 26.08, 5] },
				{ name: "威海", value: [122.1, 37.5, 5] },
				{ name: "瓦房店", value: [121.979603, 39.627114, 5] },
				{ name: "文登", value: [122.05, 37.2, 5] },
				{ name: "即墨", value: [120.45, 36.38, 5] },
				{ name: "潮州", value: [116.63, 23.68, 5] },
				{ name: "抚顺", value: [123.97, 41.97, 5] },
				{ name: "厦门", value: [118.1, 24.46, 5] },
				{ name: "玉溪", value: [102.52, 24.35, 5] },
				{ name: "汕尾", value: [115.375279, 22.786211, 5] },
				{ name: "张家口", value: [114.87, 40.82, 5] },
				{ name: "阳泉", value: [113.57, 37.85, 5] },
				{ name: "丹东", value: [124.37, 40.13, 5] },
				{ name: "莱州", value: [119.942327, 37.177017, 5] },
				{ name: "湖州", value: [120.1, 30.86, 5] },
				{ name: "汕头", value: [116.69, 23.39, 5] },
				{ name: "昆山", value: [120.95, 31.39, 5] },
				{ name: "宁波", value: [121.56, 29.86, 5] },
				{ name: "唐山市", value: [118.18, 39.65, 5] }
			];
			let convertData = function(data) {
				let res = data;
				return res;
			};
			let mapFeatures = echarts.getMap("china").geoJson.features;
			myChart.setOption({
                backgroundColor: "#0a1235",
				tooltip: {
					trigger: "item",
					formatter: function(params) {
						return params.name + " | 报考人数: " + params.value[2];
					}
				},
				geo: {
					map: "china",
					zoom: 1.2, // 默认显示比例
					scaleLimit: { min: 1.2, max: 10 }, // 缩放比例
					roam: true, // 能否缩放
					itemStyle: {
						normal: {
							areaColor: "rgb(19, 91, 153)",
							borderColor: "rgb(9, 54, 95)"
						},
						emphasis: {
							areaColor: "rgb(10, 105, 187)"
						}
					},
					// 省份
					label: {
						// normal
						normal: {
							show: false,
							color: "#fff",
							fontSize: 10
						},
						// hover
						emphasis: {
							show: true,
							color: "#fff"
						}
					}
				},
				series: [
					{
						name: "报考人数",
						type: "scatter",
						coordinateSystem: "geo",
						data: data,
						symbolSize: 5,
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: "#01f1f3",
								shadowBlur: 10,
								shadowColor: "#01f1f3"
							},
							emphasis: {
								borderColor: "#fff",
								borderWidth: 1
							}
						}
					},
					{
						type: "map",
						map: "china",
						geoIndex: 0,
						aspectScale: 0.75, //长宽比
						tooltip: {
							show: false
						}
					},
					{
						name: "Top 5",
						type: "effectScatter",
						coordinateSystem: "geo",
						data: convertData(
							data
								.sort(function(a, b) {
									return b.value - a.value;
								})
								.slice(0, 5)
						),
						symbolSize: function(val, obj) {
							const size = [24, 20, 16, 12, 8];
							return size[obj.dataIndex];
						},
						// symbolSize: 10,
						showEffectOn: "render",
						rippleEffect: {
							brushType: "stroke"
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: "{b}",
								position: "right",
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: "yellow",
								shadowBlur: 10,
								shadowColor: "yellow"
							}
						},
						zlevel: 1
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
