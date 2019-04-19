<template>
	<div id="miniComponent">
		<p class="title">分页</p>
		<!-- 分页 -->
		<pagination :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></pagination>
		<br>
		<br>
		<p class="title">时间线</p>
		<el-timeline>
			<el-timeline-item
				v-for="(activity, index) in activities2"
				:key="index"
				:icon="activity.icon"
				:type="activity.type"
				:color="activity.color"
				:size="activity.size"
				:timestamp="activity.timestamp"
			>{{activity.content}}</el-timeline-item>
		</el-timeline>
	</div>
</template>
<script>
import pagination from "components/pagination";
export default {
	// 小组件
	name: "miniComponent",
	data() {
		return {
			// 分页
			currentPaging: { currentPage: 1, pageSize: 50, totals: 1000 },
			activities2: [
				{
					content: "支持使用图标",
					timestamp: "2018-04-12 20:46",
					size: "large",
					type: "primary",
					icon: "el-icon-more"
				},
				{
					content: "支持自定义颜色",
					timestamp: "2018-04-03 20:46",
					color: "#0bbd87"
				},
				{
					content: "支持自定义尺寸",
					timestamp: "2018-04-03 20:46",
					size: "large"
				},
				{
					content: "默认样式的节点",
					timestamp: "2018-04-03 20:46"
				}
			]
		};
	},
	components: { pagination },
	created() {},
	methods: {
		// 分页sizeChange
		handleSizeChange(val) {
			this.currentPaging.pageSize = val;
			this.currentPaging.currentPage = 1;
		},
		// 分页currentChange
		handleCurrentChange(val) {
			this.currentPaging.currentPage = val;
		}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";
#miniComponent {
	width: 100%;
	.title {
		font-size: 16px;
		padding-bottom: 5px;
		margin-bottom: 20px;
		border-bottom: 1px dotted @grey;
	}
}
</style>
