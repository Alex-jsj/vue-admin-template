<template>
	<div id="myTable">
		<!--主体内容区，展示表格内容-->
		<el-table
			class="baseTable"
			:data="tableData"
			border
			size="small"
			v-loading="tableLoading"
			tooltip-effect="dark"
			ref="table"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column
				v-for="(item,index) in tableConfig"
				:key="index"
				:prop="item.prop"
				:label="item.label"
				:width="item.width?item.width:''"
				:min-width="item.minWidth?item.minWidth:''"
			>
				<template slot-scope="scope">
					<Cell v-if="item.render" :row="scope.row" :column="item" :index="scope.$index" :render="item.render"></Cell>
					<span v-else>{{scope.row[item.prop]}}</span>
				</template>
			</el-table-column>
		</el-table>
		<pagination class="float-right" :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></pagination>
	</div>
</template>

<script>
import Cell from "./expand";
// 分页
import pagination from "components/pagination";

export default {
	name: "baseTable",
	components: {
		Cell,
		pagination
	},
	props: [
		// 表格配置
		"tableConfig",
		// 表格按钮配置
		"tableBtnConfig",
		// 数据接口
		"apiService"
	],
	data() {
		return {
			//  表格加载状态
			tableLoading: false,
			// 表格展示数据
			tableData: [],
			multipleSelection: [],
			// 全选数据容器
			allSelect: false,
			// 筛选项
			filter_data: {},
			// 分页
			currentPaging: { currentPage: 1, pageSize: 50, totals: 0 }
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		// 获取列表数据
		getData() {
			this.tableLoading = true;
			// 默认数据
			let default_data = {
				page: 1,
				per_page: 10
			};
			// 筛选数据
			let data = Object.assign(default_data, this.filter_data);
			this.apiService.getInfo(data).then(res => {
				this.tableLoading = false;
				if (res.code === 200) {
					const respon = res.data || "";
					if (respon.data) {
						this.tableData = respon.data; // 给表格赋值
					}
					respon.total && (this.currentPaging.totals = respon.total);
				}
			});
		},
		// 表格选择
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.allSelect = val.length === this.table_data.length;
		},
		// 全选按钮
		toggleSelection(rows) {
			if (rows && !this.allSelect) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row, true);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		// 分页sizeChange
		handleSizeChange(val) {
			this.currentPaging.pageSize = val;
			this.currentPaging.currentPage = 1;
			// 更新数据
			this.getData();
		},
		// 分页currentChange
		handleCurrentChange(val) {
			this.currentPaging.currentPage = val;
			// 更新数据
			this.getData();
		}
	}
};
</script>

<style lang="less">
.baseTable {
	width: 100%;
	margin: 0.55rem 0;
	/* 证书等级 */
	.zhengshu {
		display: inline-block;
		width: 18px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background: #333;
		border-radius: 50%;
		&.zhengshu2 {
			background: #58b92c;
		}
	}
	/* 状态文字前样式 */
	.icon-before {
		width: 8px;
		height: 8px;
		display: inline-block;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 1px;
	}
	/* 支付方式 */
	.payment {
		font-size: 20px;
		margin-right: 4px;
		position: relative;
		top: 3px;
		line-height: 23px;
		&.icon-wechat {
			color: #51c332;
		}
		&.icon-alipay {
			color: #009fe9;
			font-size: 22px;
		}
		&.icon-yinlian {
			color: #bbdcff;
		}
	}
	/* 强制不换行 */
	.no-wrap {
		.cell {
			white-space: nowrap;
		}
	}
	thead {
		th {
			background: lighten(#ebeef5, 3%);
			color: #333;
			font-size: 14px;
		}
	}
	/* 金钱图标 */
	.icon-money,
	.icon-money1 {
		font-size: 18px;
		&.green {
			color: #67c23a;
		}
		&.blue {
			color: #409eff;
		}
		&.yellow {
			color: #e6a23c;
		}
	}
	/* 时间图标 */
	.icon-shijian {
		font-size: 12px;
		&.blue {
			color: #409eff;
		}
		&.yellow {
			color: #e6a23c;
		}
	}
	.icon-starttime {
		font-size: 16px;
		&.blue {
			color: #409eff;
		}
		&.yellow {
			color: #e6a23c;
		}
	}
	.icon-endtime {
		font-size: 16px;
		&.blue {
			color: #409eff;
		}
		&.yellow {
			color: #e6a23c;
		}
	}
	.icon-open-copy {
		font-size: 12px;
	}
	/* 科目 */
	.icon-subject {
		color: #666;
	}
	/* 性别 */
	.icon-nan {
		color: rgb(40, 216, 250);
	}
	.icon-nv {
		color: rgb(255, 118, 141);
	}
}
</style>