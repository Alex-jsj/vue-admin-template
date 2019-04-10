<template>
	<div id="treeTable">
		<el-table class="treeTable" :data="tableData" border row-key="id">
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="id" label="ID" width="60"></el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="props">
					<el-button type="primary" @click="addChild(props.row)">添加子类</el-button>
					<el-button type="warning" @click="editItem(props.row.id)">编辑</el-button>
					<el-button type="danger" @click="deleteItem(props.row.id)">删除</el-button>
				</template>
			</el-table-column>/
		</el-table>
	</div>
</template>

<script>
export default {
	name: "treeTable",
	data() {
		return {};
	},
	props: ["tableData", "theApi"],
	methods: {
		// 添加子类
		addChild: function(row = {}) {
			const id = row.id;
			// 递归
			let matchAdd = arr => {
				let len = arr.length;
				for (let i = 0; i < len; i++) {
					if (arr[i].id == id) {
						// 添加子类
						if (arr[i].hasOwnProperty("children")) {
							// 使用splice触发视图更新
							arr[i].children.splice(arr[i].children.length, 1, {
								id: Math.ceil(Math.random() * 100),
								title: "子类"
							});
						} else {
							// 使用vm.$set()触发视图更新
							this.$set(arr[i], "children", [
								{
									id: Math.ceil(Math.random() * 100),
									title: "子类"
								}
							]);
						}
						break;
					} else if (
						arr[i].id != id &&
						arr[i].hasOwnProperty("children")
					) {
						matchAdd(arr[i].children);
					}
				}
			};
			matchAdd(this.tableData);
		},
		// 编辑
		editItem: function(id) {},
		// 删除
		deleteItem: function(id) {}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#treeTable {
	width: 100%;
	.treeTable {
		width: 100%;
		margin: 0.55rem 0;
		/* 强制不换行 */
		.btns {
			.cell {
				white-space: nowrap;
			}
		}
		/deep/ thead {
			th {
				background: lighten(#ebeef5, 3%);
				color: #333;
				font-size: 14px;
			}
		}
	}
}
</style>
