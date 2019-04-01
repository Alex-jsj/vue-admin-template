<template>
	<div id="home">
		<!-- 快捷入口 -->
		<div class="quick-enter">
			<ul class="quick-list">
				<li class="item" v-for="item in quickList" :key="item.icon">
					<router-link :to="item.link" class="link">
						<div class="icon-container">
							<i class="iconfont" :class="`icon-${item.icon}`"></i>
						</div>
						<span class="quick-text">{{item.title}}</span>
					</router-link>
				</li>
			</ul>
		</div>
		<!-- 数据概览 -->
		<div class="data-overview" v-loading="loading">
			<div class="title-box">
				<span class="title float-left">{{$t('home.dataOverview')}}</span>
			</div>
			<!-- content -->
			<ul class="list">
				<li class="item-li float-left" v-for="(item,index) in data_overview_list" :key="index">
					<el-tooltip class="item" effect="dark" :content="item.info" placement="top">
						<router-link :to="item.path">
							<count-to :start-val="0" :end-val="item.num" :duration="2500" class="num"/>
							<p class="title" v-text="item.title"></p>
						</router-link>
					</el-tooltip>
				</li>
			</ul>
		</div>
		<div class="peoples" v-loading="loading">
			<div class="title-box">
				<span class="title float-left">{{$t('home.trend')}}</span>
				<router-link to="/pages/board" target="_blank" class="board">
					<el-button type >{{$t('home.dataBoard')}}</el-button>
				</router-link>
				<p class="date">{{$t('home.QueryTime')}}：{{start_date}} {{$t('base.to')}} {{end_date}}</p>
			</div>
			<!-- content -->
			<div class="echarts">
				<span class="no-data" v-show="!peoples_data[0]">{{$t('base.noData')}}</span>
				<div id="echart-bar" :class="{'canShow':peoples_data[0]}"></div>
			</div>
		</div>
		<!-- 服务器信息 -->
		<div class="server-info" v-loading="loading">
			<div class="title-box">
				<span class="title float-left">{{$t('home.serverInformation')}}</span>
			</div>
			<!-- content -->
			<ul class="list">
				<li class="item float-left">
					<div class="box">
						<router-link to="/">
							<p class="num">{{system.account_num}}</p>
							<p class="text">{{$t('home.numberOfAttachments')}}</p>
						</router-link>
					</div>
				</li>
				<li class="item float-left" v-for="(item,index) in system.system_data" :key="item.id">
					<router-link :to="item.path">
						<!-- echart -->
						<canvas :id="`info-${index+1}`" width="160" height="160"></canvas>
						<p class="data">{{item.data}}</p>
						<p class="title">{{item.title}}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// api
import * as theApi from "api/home";
// 公共函数
import { circle_canvas, component_percent } from "utils/public";
import CountTo from "vue-count-to";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

export default {
	name: "home",
	data() {
		return {
			loading: true,
			table_data: [],
			peoples_data: [
				{
					data1: 20,
					data2: 50,
					day: "2018/12/12"
				},
				{
					data1: 213,
					data2: 453,
					day: "2018/12/13"
				},
				{
					data1: 435,
					data2: 12,
					day: "2018/12/14"
				},
				{
					data1: 21,
					data2: 67,
					day: "2018/12/15"
				},
				{
					data1: 76,
					data2: 235,
					day: "2018/12/16"
				},
				{
					data1: 734,
					data2: 324,
					day: "2018/12/17"
				},
				{
					data1: 45,
					data2: 34,
					day: "2018/12/18"
				}
			],
			// 查询时间
			start_date: "",
			end_date: ""
		};
	},
	components: { CountTo },
	watch: {
		listenMenuCollapse(newVal) {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		},
		listenContentWidthType(newVal) {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		},
		listenMenuType(newVal) {
			// 动态变化canvas宽度
			setTimeout(function() {
				echarts.init(document.getElementById("echart-bar")).resize();
			}, 500);
		},
		peoples_data_title(newVal) {
			let chart = echarts.init(document.getElementById("echart-bar"));
			chart.clear();
			this.peoples_chart();
		}
	},
	computed: {
		data_overview_list() {
			return [
				{
					num: 10,
					isCbjg: false,
					show: false,
					title: this.$t("home.visitor1"),
					info: this.$t("home.visitor1"),
					path: "/"
				},
				{
					num: 213,
					isCbjg: false,
					show: false,
					title: this.$t("home.visitor2"),
					info: this.$t("home.visitor2"),
					path: ""
				},
				{
					num: 5893,
					isCbjg: false,
					show: false,
					title: this.$t("home.visitor3"),
					info: this.$t("home.visitor3"),
					path: ""
				},
				{
					num: 192032,
					isCbjg: false,
					show: false,
					title: this.$t("home.visitor4"),
					info: this.$t("home.visitor4"),
					path: ""
				}
			];
		},
		// 服务器数据
		system() {
			return {
				system_data: [
					{
						id: 0,
						path: "/",
						data: 2131,
						total: 10240,
						title: this.$t("home.diskOccupiedByTheSystem")
					},
					{
						id: 1,
						path: "/",
						data: 132,
						total: 10240,
						title: this.$t("home.diskOccupiedBySystemLog")
					},
					{
						id: 2,
						path: "/",
						data: 569,
						total: 10240,
						title: this.$t("home.diskOccupiedByDataBackup")
					}
				],
				account_num: 4098
			};
		},
		peoples_data_title() {
			return {
				data1: this.$t("home.canvas.data1"),
				data2: this.$t("home.canvas.data2")
			};
		},
		quickList() {
			return [
				{
					title: this.$t('route.introductoryPage'),
					link: "/pages/index/intro",
					icon: "intro"
				},
				{
					title: this.$t('route.icon'),
					link: "/pages/index/icon",
					icon: "icon"
				},
				{
					title: this.$t('route.components.textEditor'),
					link: "/pages/index/component/editor",
					icon: "component"
				},
				{
					title: this.$t('route.chart'),
					link: "/pages/index/intro",
					icon: "chart"
				},
				{
					title: this.$t('route.international'),
					link: "/pages/index/userManage",
					icon: "in"
				}
			];
		},
		// 角色组
		role() {
			return this.$store.state.role;
		},
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
	created: function() {
		this.date_scope();
	},
	mounted: function() {
		this.getData();
	},
	methods: {
		// 获取首页数据
		getData: async function() {
			// 默认数据
			let data = {
				start_date: this.start_date,
				end_date: this.end_date
			};
			let res = await theApi.getData(data);
			if (res.code === 200) {
				let respon = res.data || [];
				this.loading = false;
				this.peoples_chart();
				this.system_canvas();
			}
		},
		// 时间范围(当前月份)
		date_scope: function() {
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			month < 10 ? (month = "0" + month) : month;
			let day = new Date().getDate();
			day < 10 ? (day = "0" + day) : day;
			// 赋值
			this.start_date = `${year}-${month}-01`;
			this.end_date = `${year}-${month}-${day}`;
		},
		// 报考人数趋势echart
		peoples_chart: function() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById("echart-bar"));
			const that = this;
			let signData = [];
			let examData = [];
			let dates = [];
			let list = JSON.parse(JSON.stringify(that.peoples_data));
			list.map(item => {
				signData.push(item.data1);
				examData.push(item.data2);
				dates.push(item.day);
			});
			// 图表配置
			myChart.setOption({
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: [
						this.peoples_data_title.data1,
						this.peoples_data_title.data2
					]
				},
				grid: {
					left: "1%",
					right: "1%",
					bottom: "3%",
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: "category",
					// boundaryGap: false,
					axisTick: {
						show: false
					},
					data: dates
				},
				yAxis: {
					type: "value",
					axisTick: {
						show: false
					},
					splitLine: {
						lineStyle: {
							type: "dotted"
						}
					}
				},
				series: [
					{
						name: this.peoples_data_title.data1,
						type: "line",
						symbolSize: 7, //拐点圆的大小
						data: signData,
						smooth: 0.3, // 折线弧度
						itemStyle: {
							normal: {
								color: "#4771FF",
								label: {
									show: true,
									position: "top"
								}
							}
						}
					},
					{
						name: this.peoples_data_title.data2,
						type: "line",
						symbolSize: 7, //拐点圆的大小
						data: examData,
						smooth: 0.3, // 折线弧度
						itemStyle: {
							normal: {
								color: "#f3566f",
								label: {
									show: true,
									position: "top"
								}
							}
						}
					}
				]
			});
			window.addEventListener("resize", () => {
				myChart.resize();
			});
		},
		//服务器信息canvas
		system_canvas: function() {
			const colors = ["#1CD5AB", "#F44328", "#2BB3FF"];
			for (let i = 0; i < colors.length; i++) {
				let { data, total } = this.system.system_data[i];
				circle_canvas(
					document.getElementById(`info-${i + 1}`),
					component_percent(data, total),
					colors[i],
					"#F5F6FF"
				);
			}
		}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#home {
	.title-box {
		width: 100%;
		height: 40px;
		padding: 0 0.55rem;
		background: #edeef1;
		position: relative;
		vertical-align: middle;
		.title {
			font-size: 16px;
			color: @text_color;
			line-height: 40px;
		}
		.date {
			float: right;
			line-height: 40px;
			font-size: 12px;
			color: #5a5b64;
		}
		.board {
			float: right;
			line-height: 40px;
			margin-top: 6px;
			margin-left: 15px;
			.el-button {
				display: block;
			}
		}
	}
	.quick-enter {
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
							color: #37bea3;
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
	.data-overview {
		width: 100%;
		height: 300px;
		border: 0.03rem solid #edeef1;
		background: #fff;
		.list {
			margin: 0 auto;
			height: 100px;
			margin-top: 80px;
			display: flex;
			justify-content: center;
			flex-flow: row nowrap;
			.item-li {
				flex: 1 1 auto;
				// width: 4.75rem;
				height: 100%;
				text-align: center;
				border-right: 1px solid #a2b0d6;
				cursor: pointer;
				&:hover {
					.num {
						color: #409eff;
						&::after {
							background: darken(#edeef1, 10%);
						}
					}
					.title {
						color: #409eff;
					}
				}
				&:last-of-type {
					border-right: none;
				}
				.num {
					font-size: 34px;
					font-weight: 600;
					display: block;
					color: #46464b;
					.transi;
					&::after {
						content: "";
						display: block;
						width: 45%;
						height: 3px;
						background: #edeef1;
						margin: 12px auto;
						.transi;
					}
				}
				.title {
					font-size: 16px;
					display: block;
					color: @text_color;
					letter-spacing: 1px;
					.transi;
				}
			}
		}
	}
	.peoples {
		width: 100%;
		height: 400px;
		border: 1px solid #edeef1;
		margin-top: 0.875rem;
		background: #fff;
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
				height: 350px;
				opacity: 0;
				&.canShow {
					opacity: 1;
				}
			}
		}
	}
	.server-info {
		width: 100%;
		height: 340px;
		border: 1px solid #edeef1;
		margin-top: 0.875rem;
		background: #fff;
		.list {
			width: 100%;
			height: 200px;
			margin-top: 50px;
			.item {
				width: 25%;
				height: 100%;
				text-align: center;
				position: relative;
				&::after {
					content: "";
					display: block;
					width: 1px;
					height: 100px;
					background: #edeef1;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
				&:first-of-type {
					&::after {
						display: none;
					}
				}
				&:last-of-type {
					&::after {
						display: none;
					}
				}
				.box {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					.num {
						font-size: 36px;
						font-weight: 600;
						color: #46464b;
					}
					.text {
						font-size: 16px;
						color: @text_color;
						letter-spacing: 1px;
					}
				}
				#info-1,
				#info-2,
				#info-3 {
					width: 140px;
					height: 140px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				.data {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 30px;
					color: @black;
				}
				.title {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					white-space: nowrap;
					bottom: 0;
					font-size: 16px;
					color: #5a5b64;
				}
			}
		}
	}
}
</style>
