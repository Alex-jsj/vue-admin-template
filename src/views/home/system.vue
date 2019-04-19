<template>
	<div id="system">
		<div class="title-box">
			<span class="title float-left">{{$t('home.serverInformation')}}</span>
		</div>
		<!-- content -->
		<ul class="list">
			<li class="item float-left">
				<ul class="_list">
					<li class="_item" v-for="(item,index) in data.info" :key="index">
						<p class="_title">{{item.title}}</p>
						<p class="_value">{{item.value}}</p>
					</li>
				</ul>
			</li>
			<li class="item float-left" v-for="(item,index) in data.volume" :key="item.id">
				<router-link :to="item.path">
					<!-- echart -->
					<canvas :id="`info-${index+1}`" width="160" height="160"></canvas>
					<p class="data">{{item.data}}</p>
					<p class="title">{{item.title}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { circle_canvas, component_percent } from "utils/public";
export default {
	name: "system",
	props: {
		data: Object
	},
	mounted() {
		// init
		this.$nextTick(() => {
			this.system_canvas();
		});
	},
	methods: {
		//服务器信息canvas
		system_canvas: function() {
			const colors = ["#1CD5AB", "#F44328", "#2BB3FF"];
			for (let i = 0; i < colors.length; i++) {
				let { data, total } = this.data.volume[i];
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

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#system {
	width: 100%;
	height: 340px;
	border: 1px solid #edeef1;
	margin-top: 0.875rem;
	background: #fff;
	.list {
		width: 100%;
		height: 200px;
		margin-top: 50px;
		padding: 0 20px;
		.item {
			width: 23%;
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
				width: 31%;
				&::after {
					display: none;
				}
			}
			&:last-of-type {
				&::after {
					display: none;
				}
			}
			._list {
				width: 100%;
				height: 100%;
				border: 1px solid #edeef1;
				border-radius: 6px;
				border-bottom: none;
				overflow: hidden;
				._item {
					width: 100%;
					height: 16.67%;
					._title,
					._value {
						display: flex;
						align-items: center;
						height: 100%;
						font-size: 14px;
						float: left;
						text-align: left;
						padding: 0 10px;
						color: #5a5b64;
						&._title {
							width: 40%;
							border-right: 1px solid #edeef1;
							border-bottom: 1px solid #edeef1;
						}
						&._value {
							width: 60%;
							border-bottom: 1px solid #edeef1;
						}
					}
					&:last-of-type {
						._title {
							border-bottom-left-radius: 6px;
						}
						._value {
							border-bottom-right-radius: 6px;
						}
					}
				}
			}
			#info-1,
			#info-2,
			#info-3 {
				width: 140px;
				height: 140px;
				position: absolute;
				top: 45%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.data {
				position: absolute;
				top: 45%;
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
				bottom: 5%;
				font-size: 16px;
				color: #5a5b64;
			}
		}
	}
}
</style>
