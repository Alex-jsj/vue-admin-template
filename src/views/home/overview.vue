<template>
	<div id="overview">
		<div class="title-box">
			<span class="title float-left">{{$t('home.dataOverview')}}</span>
		</div>
		<!-- content -->
		<ul class="list">
			<li class="item-li float-left" v-for="(item,index) in overview_list" :key="index">
				<router-link :to="item.path">
					<count-to :start-val="0" :end-val="item.num" :duration="2500" class="num"/>
					<p class="title" v-text="item.title"></p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
	name: "overview",
	computed: {
		overview_list() {
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
		}
	},
	props: {
		data: Array
	},
	components: { CountTo }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#overview {
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
</style>
