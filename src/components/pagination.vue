<template>
	<div id="ele-pagination" class="public-pages">
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPaging.currentPage"
			:page-size="currentPaging.pageSize"
			:page-sizes="[10, 50, 100]"
			layout="total,sizes, prev, pager, next, jumper"
			background
			:total="currentPaging.totals"
		></el-pagination>
	</div>
</template>

<script>
export default {
	name: "ele_pagination",
	props: {
		currentPaging: {}
	},
	methods: {
		//分页
		handleSizeChange(val) {
			this.$emit("sizeChange", val);
		},
		handleCurrentChange(val) {
			this.$emit("currentChange", val);
		}
	}
};
</script>

<style lang="less" scoped>
#ele-pagination {
	display: inline-block;
}
</style>
