<template>
	<div id="home">
		<!-- 快捷入口 -->
		<QuickEnter></QuickEnter>
		<!-- 数据概览 -->
		<Overview :data="overviewData"></Overview>
		<!-- 趋势 -->
		<Trend :data="trendData"></Trend>
		<!-- 服务器信息 -->
		<System :data="systemData"></System>
	</div>
</template>

<script>
import QuickEnter from "./quickEnter";
import Overview from "./overview";
import Trend from "./trend";
import System from "./system";
// api
import * as theApi from "api/home";

export default {
	name: "home",
	data() {
		return {
			loading: true,
			// 概览
			overviewData: [],
			// 趋势
			trendData: [
				{
					data1: 15,
					data2: 5,
					data3: 27,
					day: "2018/03/01"
				},
				{
					data1: 7,
					data2: 25,
					data3: 1,
					day: "2018/03/02"
				},
				{
					data1: 34,
					data2: 14,
					data3: 23,
					day: "2018/03/03"
				},
				{
					data1: 23,
					data2: 23,
					data3: 12,
					day: "2018/03/04"
				},
				{
					data1: 65,
					data2: 2,
					data3: 45,
					day: "2018/03/05"
				},
				{
					data1: 12,
					data2: 5,
					data3: 23,
					day: "2018/03/06"
				},
				{
					data1: 23,
					data2: 53,
					data3: 56,
					day: "2018/03/07"
				}
			]
		};
	},
	computed: {
		// 服务器信息
		systemData() {
			return {
				info: [
					{
						title: this.$t("home.system.title1"),
						value: "Linux"
					},
					{
						title: this.$t("home.system.title2"),
						value: "admin"
					},
					{
						title: this.$t("home.system.title3"),
						value: "2019年3月22日 15:46:38"
					},
					{
						title: this.$t("home.system.title4"),
						value: "Apache/2.4.9 (Win64)"
					},
					{
						title: this.$t("home.system.title5"),
						value: "5.5.12"
					},
					{
						title: this.$t("home.system.title6"),
						value: "nginx/1.12.2"
					}
				],
				volume: [
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
				]
			};
		}
	},
	components: { QuickEnter, Overview, Trend, System },
	created: function() {
		this.getData();
	},
	methods: {
		// 获取首页数据
		getData: function() {
			// 默认数据
			let data = {
				start_date: this.start_date,
				end_date: this.end_date
			};
			theApi
				.getData(data)
				.then(res => {
					if (res.code === 200) {
						let respon = res.data || [];
						this.loading = false;
					}
				})
				.catch(err => {
					this.loading = false;
				});
		}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#home {
	/deep/.title-box {
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
}
</style>
