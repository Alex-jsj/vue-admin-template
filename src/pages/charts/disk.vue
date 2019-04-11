<template>
	<div class="echarts">
		<div id="echart-bar"></div>
	</div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/pie");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
	name: "chartdisk",
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
			// 图表配置
			myChart.setOption({
				backgroundColor: "rgb(43, 51, 59)",
				toolbox: {
					show: true,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ["pie", "funnel"]
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				calculable: true,
				tooltip: {
					trigger: "item",
					formatter: "{a}<br/>{b}:{c}千万元"
				},
				title: {
					text: "南丁格尔玫瑰图--PieHalfRose",
					left: "center",
					top: 20,
					textStyle: {
						color: "#ccc"
					}
				},
				calculable: true,
				legend: {
					icon: "circle",
					x: "center",
					y: "15%",
					data: [
						"义乌市1",
						"义乌市2",
						"义乌市3",
						"义乌市4",
						"义乌市5",
						"义乌市6",
						"义乌市7",
						"义乌市8",
						"义乌市9"
					],
					textStyle: {
						color: "#fff"
					}
				},
				series: [
					{
						name: "XX线索",
						type: "pie",
						radius: [37, 155],
						avoidLabelOverlap: false,
						startAngle: 0,
						center: ["50.1%", "34%"],
						roseType: "area",
						selectedMode: "single",
						label: {
							normal: {
								show: true,
								formatter: "{c}千万元"
							},
							emphasis: {
								show: true
							}
						},
						labelLine: {
							normal: {
								show: true,
								smooth: false,
								length: 20,
								length2: 10
							},
							emphasis: {
								show: true
							}
						},
						data: [
							{
								value: 600.58,
								name: "义乌市1",
								itemStyle: {
									normal: {
										color: "#f845f1"
									}
								}
							},
							{
								value: 1100.58,
								name: "义乌市2",
								itemStyle: {
									normal: {
										color: "#ad46f3"
									}
								}
							},
							{
								value: 1200.58,
								name: "义乌市3",
								itemStyle: {
									normal: {
										color: "#5045f6"
									}
								}
							},
							{
								value: 1300.58,
								name: "义乌市4",
								itemStyle: {
									normal: {
										color: "#4777f5"
									}
								}
							},
							{
								value: 1400.58,
								name: "义乌市5",
								itemStyle: {
									normal: {
										color: "#44aff0"
									}
								}
							},
							{
								value: 1500.58,
								name: "义乌市6",
								itemStyle: {
									normal: {
										color: "#45dbf7"
									}
								}
							},
							{
								value: 1500.58,
								name: "义乌市7",
								itemStyle: {
									normal: {
										color: "#f6d54a"
									}
								}
							},
							{
								value: 1600.58,
								name: "义乌市8",
								itemStyle: {
									normal: {
										color: "#f69846"
									}
								}
							},
							{
								value: 1800,
								name: "义乌市9",
								itemStyle: {
									normal: {
										color: "#ff4343"
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							},
							{
								value: 0,
								name: "",
								itemStyle: {
									normal: {
										label: {
											show: false
										},
										labelLine: {
											show: false
										}
									}
								}
							}
						]
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
	#echart-bar {
		width: 100%;
		height: 350px;
		opacity: 1;
	}
}
</style>
