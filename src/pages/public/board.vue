<template>
	<div id="board">
		<!-- 标题 -->
		<div class="title-box">
			<img src="../../../static/img/board/title.png" class="title">
			<p class="now">{{now}}</p>
			<i class="iconfont icon-quanping" @click="setFullScreen()"></i>
			<p class="date-range">
				统计时间：
				<span>{{start_date}} - {{end_date}}</span>
			</p>
		</div>
		<div class="box-left">
			<div class="box-2">
				<div class="box-3">
					<!-- 天气情况 -->
					<div class="box weather">
						<div class="box-title">
							<span>天气情况</span>
						</div>
						<p class="title">{{weatherInfo.currentCity}}今日天气监控</p>
						<p class="item">
							气温：
							<span>{{weatherData.temperature}}</span>
						</p>
						<p class="item">
							天气状况：
							<span>{{weatherData.weather}}</span>
						</p>
						<p class="item">
							pm2.5：
							<span>{{weatherInfo.pm25}}</span>
						</p>
						<p class="item">
							风力：
							<span>{{weatherData.wind}}</span>
						</p>
						<p class="item">
							紫外线强度：
							<span>{{weatherZS_2.zs}}</span>
						</p>
						<p class="item">
							穿衣指数：
							<span>{{weatherZS_1.des}}</span>
						</p>
					</div>
					<!-- 报名地区 -->
					<div class="box sign-place-top5">
						<div class="box-title">
							<span>报名地区TOP5</span>
						</div>
						<ul class="top5-list">
							<li class="item" v-for="(item,index) in top5" :key="index">
								<span class="sort">TOP{{index+1}}</span>
								<span class="text">{{item.name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- 实时累计报考人数 -->
				<div class="box sign-num">
					<div class="box-title">
						<span>实时累计报考人数</span>
					</div>
					<ol class="sign-num-list">
						<li class="item" v-for="(item,index) in sign_num.apply_exam" :key="index" :class="{'nums':item!=','}">{{item}}</li>
					</ol>
					<p class="zsbf">证书颁发人数：
						<count-to :start-val="0" :end-val="sign_num.certificate_num" :duration="2500"/>
						<!-- <span>{{sign_num.zsbf}}</span> -->
					</p>
					<!-- canvas -->
					<div id="echart-sign-num"></div>
					<div class="item-list">
						<!-- <span class="num">{{sign_num.dk}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.waiting_for_exam" :duration="2500" class="num"/>
						<p class="title">待考人数</p>
					</div>
					<div class="item-list">
						<!-- <span class="num">{{sign_num.complete_exam}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.complete_exam" :duration="2500" class="num"/>
						<p class="title">已考人数</p>
					</div>
					<div class="item-list margin">
						<!-- <span class="num">{{sign_num.df}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.waiting_for_certificate" :duration="2500" class="num"/>
						<p class="title">待发证人数</p>
					</div>
					<div class="item-list">
						<!-- <span class="num">{{sign_num.cbjg}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.agent_num" :duration="2500" class="num"/>
						<p class="title">承办单位</p>
					</div>
					<div class="item-list margin">
						<!-- <span class="num">{{sign_num.kz}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.today_exam" :duration="2500" class="num"/>
						<p class="title">今日考证人数</p>
					</div>
					<div class="item-list">
						<!-- <span class="num">{{sign_num.km}}</span> -->
						<count-to :start-val="0" :end-val="sign_num.subject_num" :duration="2500" class="num"/>
						<p class="title">考试科目</p>
					</div>
				</div>
				<!-- 报考人数分布图 -->
				<div class="box sign-place">
					<div class="box-title">
						<span>全国月报考人数分布图</span>
					</div>
					<div class="echart" id="echart-map"></div>
				</div>
			</div>
			<!-- 报考趋势 -->
			<div class="box sign-qushi">
				<div class="box-title">
					<span>报考人数趋势</span>
				</div>
				<div class="echart" id="echart-qushi"></div>
				<!-- switch -->
				<div class="switch-box">
					<p :class="{'active':qushiType=='day'}" @click="switchQushi('day')">日</p>
					<p :class="{'active':qushiType=='month'}" @click="switchQushi('month')">月</p>
				</div>
			</div>
		</div>
		<div class="box-right">
			<!-- top 10 -->
			<div class="box top-10">
				<div class="box-title">
					<span>月排行榜TOP10</span>
				</div>
				<!-- switch -->
				<div class="switch-box">
					<i class="iconfont icon-zuojiantou" v-if="top10Type != 1" @click="tpo10Switch('prev')"></i>
					<span>{{top10TypeName}}</span>
					<i class="iconfont icon-youjiantou" v-if="top10Type != 3" @click="tpo10Switch('next')"></i>
				</div>
				<ul class="top10-list">
					<li class="item title">
						<span class="sort">排序</span>
						<span class="title">机构</span>
						<span class="num_month" v-if="top10Type === 1">月报考人数</span>
						<span class="money" v-else-if="top10Type === 2">报考费</span>
						<span class="bili" v-else>通过率</span>
					</li>
					<li class="item" v-for="(item,index) in top10" :key="index">
						<span class="sort">
							<i class="iconfont" :class="'icon-diyi'" v-if="index == 0"></i>
							<i class="iconfont" :class="'icon-dier'" v-else-if="index == 1"></i>
							<i class="iconfont" :class="'icon-disan'" v-else-if="index == 2"></i>
							<b v-else>{{index+1}}</b>
						</span>
						<el-tooltip :content="item.agent_title" placement="left" popper-class="board-tooltip">
							<span class="title">{{item.agent_title}}</span>
						</el-tooltip>
						<span class="num_month" v-if="top10Type === 1">{{item.total_num}}</span>
						<span class="money" v-else-if="top10Type === 2">￥{{item.total_amount}}</span>
						<span class="bili" v-else>{{item.pass_rate*100}}%</span>
					</li>
				</ul>
			</div>
			<!-- 月科目人数对比 -->
			<div class="box subject">
				<div class="box-title">
					<span>月科目人数对比</span>
				</div>
				<div class="echart" id="echart-subject"></div>
			</div>
		</div>
	</div>
</template>

<script>
// api
import { getInfo } from "api/board";
import CountTo from "vue-count-to";
// common js
import { filter_date } from "utils/public";
import "../../../static/data/china.js";
// 引入 ECharts 主模块
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line"); // 折线图
require("echarts/lib/chart/bar"); // 柱状图
require("echarts/lib/chart/pie"); // pie
// map
require("echarts/lib/chart/map");
// require("@static/data/china.js");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

export default {
	name: "board",
	data() {
		return {
			// now
			now: filter_date(new Date(), "YMDHMS"),
			start_date: "",
			end_date: "",
			timer: null, // 定时器名称
			lxTimer: null, // 轮询定时器名称
			isFullScreen: false, //全屏
			// 报考人数趋势
			qushi: [],
			qushiType: "day",
			// top5
			top5: [],
			// top10
			top10: [],
			top10All: [],
			top10Type: 1, // 1、报考人数 2、报考费 3、通过率
			top10TypeName: "月报考人数", // 1、报考人数 2、报考费 3、通过率
			subject_data: {
				total: [],
				child: []
			},
			// 累计报考人数
			sign_num: {
				complete_exam: 0,
				certificate_num: 0,
				waiting_for_exam: 0,
				apply_exam: 0,
				waiting_for_certificate: 0,
				agent_num: 0,
				today_exam: 0,
				subject_num: 0
			},
			// 天气
			weatherInfo: {},
			weatherData: {},
			weatherZS_1: {},
			weatherZS_2: {},
			// 报考人数分布地图
			mapData: []
		};
	},
	components: { CountTo },
	created() {
		this.timer = setInterval(() => {
			this.now = filter_date(new Date(), "YMDHMS");
		}, 1000);
	},
	mounted() {
		this.addBoder();
		this.getData();
		this.lxTimer = setInterval(() => {
			this.getData();
		}, 30000);
	},
	methods: {
		// 获取数据
		getData: function(val) {
			const that = this;
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1;
			month < 10 ? (month = "0" + month) : month;
			let day = new Date().getDate();
			day < 10 ? (day = "0" + day) : day;
			// 赋值
			this.start_date = `${year}-${month}-01`;
			this.end_date = `${year}-${month}-${day}`;
			// 默认数据
			let data = {
				start_date: this.start_date,
				end_date: this.end_date,
				type: this.qushiType
			};
			getInfo(data).then(res => {
				if (res.code === 200) {
					const respon = res.data || [];
					if (val !== "qushi") {
						// 报考人数分布图
						if (respon.city_num) {
							this.mapData = [];
							const theMapData = respon.city_num;
							for (let i = 0; i < theMapData.length; i++) {
								this.mapData.push({
									name: theMapData[i].name,
									value: [
										theMapData[i].geo_lng,
										theMapData[i].geo_lat,
										theMapData[i].num
									]
								});
							}
							this.mapEchart();
						}

						// 天气情况
						this.get_weather(respon.city_weather);
						// top5
						if (respon.top_five) {
							this.top5 = [];
							this.top5 = respon.top_five;
						}
						// top10
						if (respon.top_agent) {
							this.top10All = [];
							this.top10All = respon.top_agent;
							this.tpo10Switch("");
						}
						// 累计报考人数
						if (respon.real_time) {
							this.sign_num = {
								complete_exam: 0,
								certificate_num: 0,
								waiting_for_exam: 0,
								apply_exam: 0,
								waiting_for_certificate: 0,
								agent_num: 0,
								today_exam: 0,
								subject_num: 0
							};
							this.sign_num = respon.real_time;
							this.formateSum();
							this.gaugeEchart();
						}
						// 月科目人数对比
						if (respon.month_subject_data) {
							this.subject_data = {
								total: [],
								child: []
							};
							const obj = respon.month_subject_data;
							for (let key in obj) {
								this.subject_data.total.push({
									title: obj[key].title,
									pass: obj[key].total.success_num,
									no_pass: obj[key].total.failure_num
								});
							}
							this.subjectEchart();
						}
					}
					// 报考人数趋势
					if (respon.trend) {
						this.qushi = [];
						this.qushi = respon.trend;
						this.qushiEchart();
					}
				}
			});
		},
		// 获取天气
		get_weather: function(data) {
			this.weatherInfo = {};
			this.weatherData = {};
			this.weatherZS_1 = {};
			this.weatherZS_2 = {};
			if (data.results[0]) {
				this.weatherInfo = data.results[0];
				this.weatherData = this.weatherInfo.weather_data[0];
				this.weatherZS_1 = this.weatherInfo.index[0];
				this.weatherZS_2 = this.weatherInfo.index[4];
			}
		},
		// 为每个box添加四个边角
		addBoder: function() {
			let boxs = document.getElementsByClassName("box");
			for (let i = 0; i < boxs.length; i++) {
				let fragment = document.createDocumentFragment();
				for (let k = 0; k < 4; k++) {
					let iNode = document.createElement("i");
					iNode.className = "boder-corner";
					fragment.appendChild(iNode);
				}
				boxs[i].appendChild(fragment);
			}
		},
		// 报考人数趋势
		qushiEchart: function() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById("echart-qushi"));
			const that = this;
			let signData = [];
			let examData = [];
			let dates = [];
			let list = JSON.parse(JSON.stringify(that.qushi));
			list.map(item => {
				signData.push(item.num_of_applicants);
				examData.push(item.num_of_exams);
				dates.push(item.date);
			});
			// 图表配置
			myChart.setOption({
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: ["报考人数", "考试人数"],
					x: "53%",
					y: "5%",
					textStyle: {
						color: "#fff"
					}
				},
				grid: {
					left: "0",
					right: "0",
					bottom: "0",
					top: "20%",
					containLabel: true
				},
				xAxis: {
					type: "category",
					// boundaryGap: false,
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: "#00528e"
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#fff"
						}
					},
					data: dates
				},
				yAxis: {
					type: "value",
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: "#00528e"
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#fff"
						}
					},
					splitLine: {
						lineStyle: {
							color: "#00528e"
						}
					}
				},
				series: [
					{
						name: "报考人数",
						type: "line",
						symbolSize: 7, //拐点圆的大小
						data: signData,
						smooth: 0.3, // 折线弧度
						itemStyle: {
							normal: {
								color: "#0086e0",
								label: {
									show: true,
									position: "top"
								}
							}
						}
					},
					{
						name: "考试人数",
						type: "line",
						symbolSize: 7, //拐点圆的大小
						data: examData,
						smooth: 0.3, // 折线弧度
						itemStyle: {
							normal: {
								color: "#01ffff",
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
		// 趋势切换
		switchQushi: function(type) {
			if (type === "day") {
				this.qushiType = "day";
				this.getData("qushi"); // 只更换趋势数据
			} else {
				this.qushiType = "month";
				this.getData("qushi"); // 只更换趋势数据
			}
		},
		// 月科目人数对比
		subjectEchart: function() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(
				document.getElementById("echart-subject")
			);
			const that = this;
			const list = that.subject_data.total;
			let passData = [];
			let no_passData = [];
			let titles = [];
			// 循环数据
			list.map(item => {
				passData.push(item.pass);
				no_passData.push(item.no_pass);
				titles.push(item.title);
			});
			// 图表配置
			myChart.setOption({
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ["通过人数", "未通过人数"],
					x: "right",
					y: "5%",
					textStyle: {
						color: "#fff"
					}
				},
				grid: {
					left: "0",
					right: "0",
					bottom: "0",
					top: "20%",
					containLabel: true
				},
				xAxis: [
					{
						type: "category",
						data: titles,
						axisLine: {
							lineStyle: {
								color: "#00528e"
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#fff"
							}
						},
						axisTick: {
							show: false
						}
					}
				],
				yAxis: [
					{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#00528e"
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#fff"
							}
						},
						splitLine: {
							lineStyle: {
								color: "#00528e",
								type: "dotted"
							}
						}
					}
				],
				series: [
					{
						name: "通过人数",
						type: "bar",
						stack: "总量",
						barWidth: "50%",
						data: passData,
						itemStyle: {
							normal: {
								color: "#0099ff"
							}
						}
					},
					{
						name: "未通过人数",
						type: "bar",
						stack: "总量",
						data: no_passData,
						itemStyle: {
							normal: {
								color: "#01ffff",
								label: {
									show: true,
									position: "top",
									formatter: function(value) {
										let percent = "";
										list.map((item, index) => {
											if (value.dataIndex == index) {
												if (
													item.pass + item.no_pass ==
													0
												) {
													// 0 不能作为分母 防止NAN
													percent = 0;
												} else {
													percent =
														(
															(item.pass /
																(item.pass +
																	item.no_pass)) *
															100
														).toFixed(1) + "%";
												}
											}
										});
										return percent;
									}
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
		// 格式化报考人数数字
		formateSum: function() {
			let num = parseInt(
				JSON.parse(JSON.stringify(this.sign_num.apply_exam))
			);
			num = String(num)
				.split("")
				.reverse();
			let arr = [];
			for (let i = 0; i < num.length; i++) {
				if (i % 3 == 0 && i != 0) {
					arr.push(",");
				}
				arr.push(num[i]);
			}
			this.sign_num.apply_exam = arr.reverse();
		},
		// 实时累计报考人数仪表盘echart
		gaugeEchart: function() {
			let myChart = echarts.init(
				document.getElementById("echart-sign-num")
			);
			let percent = this.sign_num.pass_rate;
			function getData() {
				return [
					{
						value: percent,
						itemStyle: {
							normal: {
								color: "#0099ff",
								shadowBlur: 10,
								shadowColor: "#0099ff"
							}
						}
					},
					{
						value: 1 - percent,
						itemStyle: {
							normal: {
								color: "transparent"
							}
						}
					}
				];
			}
			myChart.setOption({
				title: {
					text: String(percent * 100).toString(2) + "%\n通过率",
					x: "center",
					y: "center",
					textStyle: {
						color: "#0099ff",
						fontWeight: "bolder",
						fontSize: 16
					}
				},
				series: [
					{
						type: "pie",
						radius: ["70%", "79%"],
						silent: true,
						label: {
							normal: {
								show: false
							}
						},
						data: [
							{
								value: 1,
								itemStyle: {
									normal: {
										color: "#020e1e",
										shadowBlur: 10,
										shadowColor: "#020e1e"
									}
								}
							}
						],
						animation: false
					},
					{
						type: "pie",
						radius: ["70%", "79%"],
						silent: true,
						label: {
							normal: {
								show: false
							}
						},
						data: [
							{
								value: 1,
								itemStyle: {
									normal: {
										color: "#013066",
										shadowBlur: 30,
										shadowColor: "#013066"
									}
								}
							}
						],
						animation: false
					},
					{
						name: "main",
						type: "pie",
						radius: ["82%", "85%"],
						label: {
							normal: {
								show: false
							}
						},
						data: getData(),
						animationEasingUpdate: "cubicInOut",
						animationDurationUpdate: 500
					}
				]
			});
			window.addEventListener("resize", () => {
				myChart.resize();
			});
		},
		// 报考人数分布图
		mapEchart: function() {
			let myChart = echarts.init(document.getElementById("echart-map"));
			let data = this.mapData;
			let convertData = function(data) {
				let res = data;
				// console.log(res)
				return res;
			};
			let mapFeatures = echarts.getMap("china").geoJson.features;
			myChart.setOption({
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
			window.addEventListener("resize", () => {
				myChart.resize();
			});
		},
		// top10 切换
		tpo10Switch: function(type, idx = 1) {
			const data = this.top10All;
			if (type === "next") {
				this.top10Type++;
			} else if (type === "prev") {
				this.top10Type--;
			} else {
				this.top10Type = 1;
			}
			switch (this.top10Type) {
				case 1:
					this.top10TypeName = "月报考人数";
					this.top10 = data.apply_num;
					break;
				case 2:
					this.top10TypeName = "报考费";
					this.top10 = data.apply_amount;
					break;
				case 3:
					this.top10TypeName = "通过率";
					this.top10 = data.pass_rate;
					break;
			}
		},
		// 网页全屏
		setFullScreen: function(val) {
			this.isFullScreen = !this.isFullScreen;
			let docElm = document.documentElement; //W3C
			if (this.isFullScreen) {
				let el = document.documentElement;
				let rfs =
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
	},
	beforeDestroy() {
		clearInterval(this.timer);
		this.timer = null;
		clearInterval(this.lxTimer);
		this.lxTimer = null;
	}
};
</script>

<style lang="less">
#board {
	width: 100%;
	height: 100vh;
	background: url("../../../static/img/board/bg2.jpg") no-repeat;
	background-size: 100% 100%;
	background-position: center;
	overflow: hidden;
	padding: 0 0.7rem 2.59vh 0.7rem;
	.title-box {
		width: 100%;
		height: 9.9vh;
		position: relative;
		margin-bottom: 2.59vh;
		.title {
			display: block;
			width: 17.7rem;
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.now {
			color: #01f1f3;
			font-size: 0.35rem;
			position: absolute;
			bottom: -0.6vh;
			left: 50%;
			transform: translateX(-50%);
		}
		.date-range {
			color: #0099ff;
			font-size: 0.35rem;
			position: absolute;
			bottom: -1.5vh;
			right: 2rem;
			span {
				color: #01f1f3;
			}
		}
		.icon-quanping {
			color: #0099ff;
			position: absolute;
			bottom: -1.7vh;
			right: 0;
			cursor: pointer;
			font-size: 0.8rem;
			font-weight: 600;
			transition: color 0.3s;
			&:hover {
				color: #01f1f3;
			}
		}
	}
	.box {
		float: left;
		border: 2px solid #0069b6;
		position: relative;
		padding: 1.3vh 0.35rem;
		overflow: hidden;
		.box-title {
			width: 7.75rem;
			height: 3.7vh;
			background: url("../../../static/img/board/title-bg.png") no-repeat;
			background-size: 100% 100%;
			background-position: center;
			overflow: hidden;
			&::before {
				content: "";
				float: left;
				width: 0.1rem;
				height: 1.85vh;
				background: #0099ff;
				margin: 0 0.25rem;
				margin-top: 0.925vh;
			}
			span {
				float: left;
				font-size: 0.5rem;
				color: #0099ff;
				line-height: 3.7vh;
			}
		}
		.boder-corner {
			display: block;
			width: 22px;
			height: 22px;
			border: 2px solid #0099ff;
			position: absolute;
			&:nth-of-type(1) {
				top: -2px;
				left: -2px;
				border-bottom: none;
				border-right: none;
			}
			&:nth-of-type(2) {
				top: -2px;
				right: -2px;
				border-bottom: none;
				border-left: none;
			}
			&:nth-of-type(3) {
				bottom: -2px;
				left: -2px;
				border-top: none;
				border-right: none;
			}
			&:nth-of-type(4) {
				bottom: -2px;
				right: -2px;
				border-top: none;
				border-left: none;
			}
		}
	}
	.box-left {
		width: 31rem;
		height: 85.18vh;
		float: left;
		position: relative;
		.box-2 {
			width: 100%;
			height: 48vh;
			float: left;
			.box-3 {
				width: 8.5rem;
				height: 100%;
				margin-right: 0.35rem;
				float: left;
				position: relative;
			}
		}
		.weather {
			width: 100%;
			height: 24.47vh;
			.title {
				margin-top: 0.93vh;
				margin-bottom: 0.2vh;
				font-size: 0.4rem;
				color: #0099ff;
			}
			.item {
				width: 100%;
				font-size: 0.3rem;
				color: #0099ff;
				margin-right: 0.5rem;
				line-height: 2vh;
				span {
					color: #01f1f3;
				}
			}
		}
		.sign-place-top5 {
			width: 100%;
			height: 22.22vh;
			position: absolute;
			bottom: 0;
			.top5-list {
				width: 100%;
				.item {
					width: 100%;
					height: 2.22vh;
					overflow: hidden;
					margin-top: 0.93vh;
					background: #012347;
					padding-right: 0.5rem;
					&:nth-of-type(4),
					&:nth-of-type(5) {
						.sort {
							background: #0099ff;
						}
					}
					span {
						line-height: 2.22vh;
					}
					.sort {
						font-size: 0.4rem;
						float: left;
						width: 1.65rem;
						height: 100%;
						background: #01ffff;
						text-align: center;
						font-weight: 600;
						color: #012857;
					}
					.text {
						color: #fff;
						float: right;
						font-size: 0.4rem;
					}
				}
			}
		}
		.sign-num {
			width: 9.5rem;
			height: 100%;
			.sign-num-list {
				width: 100%;
				height: 4.63vh;
				display: flex;
				margin-top: 0.93vh;
				.item {
					flex: 1 1 auto;
					color: #fff;
					width: 0.5rem;
					height: 100%;
					text-align: center;
					line-height: 4.63vh;
					margin-right: 0.25rem;
					font-size: 0.7rem;
					&:last-of-type {
						margin-right: 0;
					}
					&.nums {
						width: 1.05rem;
						background: #0099ff;
					}
				}
			}
			.zsbf {
				margin-top: 1.85vh;
				margin-bottom: 2.22vh;
				font-size: 0.4rem;
				color: #0099ff;
				span {
					color: #01f1f3;
				}
			}
			#echart-sign-num {
				width: 4.2rem;
				height: 14.72vh;
				float: left;
			}
			.item-list {
				width: 4.2rem;
				height: 6.9vh;
				float: left;
				border: 1px solid #007fb7;
				margin-bottom: 0.93vh;
				margin-left: 0.25rem;
				&.margin {
					margin-left: 0;
				}
				&::before {
					content: "";
					display: block;
					float: left;
					width: 0.25rem;
					height: 100%;
					background: #0099ff;
				}
				.num {
					margin-top: 1.24vh;
				}
				.num,
				.title {
					display: block;
					color: #fff;
					font-size: 0.4rem;
					text-align: center;
					line-height: 2.2vh;
					white-space: nowrap;
				}
			}
		}
		.sign-place {
			width: 12.25rem;
			height: 100%;
			float: right;
		}
		.sign-qushi {
			width: 100%;
			height: 35.6vh;
			position: absolute;
			bottom: 0;
			.switch-box {
				position: absolute;
				top: 2.6vh;
				right: 0.35rem;
				p {
					float: left;
					color: #0069b6;
					font-size: 0.35rem;
					padding: 0.5vh 0.2rem;
					margin-left: 0.1rem;
					border: 1px solid #0069b6;
					border-radius: 0.1rem;
					cursor: pointer;
					transition: all 0.3s;
					&.active {
						border: 1px solid #01ffff;
						color: #01ffff;
					}
					&:hover {
						border: 1px solid #01ffff;
						color: #01ffff;
					}
				}
			}
		}
	}
	.box-right {
		width: 15.2rem;
		height: 85.18vh;
		position: relative;
		float: right;
		.top-10 {
			width: 100%;
			height: 52.78vh;
			position: relative;
			.switch-box {
				position: absolute;
				top: 2.5vh;
				right: 0.35rem;
				.iconfont,
				span {
					font-size: 0.4rem;
					float: left;
					color: #0069b6;
					line-height: 2.5vh;
				}
				span {
					margin: 0 0.2rem;
				}
				.iconfont {
					cursor: pointer;
					transition: color 0.3s;
					&:hover {
						color: #01ffff;
					}
				}
			}
			.top10-list {
				width: 100%;
				margin-top: 0.93vh;
				.item {
					width: 100%;
					height: 4.07vh;
					border-bottom: 1px solid #004279;
					text-align: center;
					overflow: hidden;
					span {
						font-size: 0.35rem;
						color: #fff;
						line-height: 4.07vh;
						float: left;
						white-space: nowrap;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						&.sort {
							color: #01ffff;
							font-weight: 600;
							width: 1.5rem;
							.icon-diyi {
								color: #fddb53;
								font-size: 0.55rem;
							}
							.icon-dier {
								color: #f5f5f5;
								font-size: 0.55rem;
							}
							.icon-disan {
								color: #cb9870;
								font-size: 0.5rem;
							}
						}
						&.title {
							width: calc(~"100% - 1.5rem - 2.5rem");
							text-align: left;
						}
						&.num_month {
							width: 2.5rem;
						}
						&.money {
							width: 2.5rem;
						}
						&.bili {
							width: 2.5rem;
						}
					}
					&.title {
						height: 4.44vh;
						background: #012f5f;
						span {
							color: #01ffff;
							font-weight: 600;
							line-height: 4.44vh;
							font-size: 0.4rem;
							&.title {
								text-align: center;
							}
						}
					}
				}
			}
		}
		.subject {
			width: 100%;
			height: 30.83vh;
			position: absolute;
			bottom: 0;
		}
	}
	.echart {
		width: 100%;
		height: calc(~"100%");
		margin-top: -4vh;
	}
}
.board-tooltip {
	background: #004279 !important;
	.popper__arrow {
		border-right-color: #004279 !important;
		border-left-color: #004279 !important;
		&::after {
			border-right-color: #004279 !important;
			border-left-color: #004279 !important;
		}
	}
	&.is-dark {
		background: #004279 !important;
	}
}
</style>

