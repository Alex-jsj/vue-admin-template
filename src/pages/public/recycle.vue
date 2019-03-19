<template>
	<div id="recycle">
		<!-- 表格 -->
		<baseTable :apiService="table_ajax" :table-config="configData.tableConfig" :table-btn-config="configData.tableBtnConfig"></baseTable>
	</div>
</template>
<script>
// api
import * as recycleApi from "api/userManage/recycle";
// 组件
import baseTable from "components/baseTable";
// 状态检测
import { checkFreeze, checkRole } from "common/js/checkTypeSingle";

export default {
	// 登陆日志
	name: "recycle",
	data() {
		return {
			configData: {
				tableConfig: [
					{ label: "ID", prop: "id", width: "60" },
					{ label: "用户名", prop: "account" },
					{ label: "姓名/昵称", prop: "role_title" },
					{
						label: "角色组",
						prop: "role_type",
						width: "150",
						render: (h, params) => {
							return (
								<el-tag
									size="small"
									type={
										checkRole(params.row.role_type)
											.type_name
									}
								>
									<i
										class={`iconfont ${
											checkRole(params.row.role_type)
												.class_name
										}`}
									/>
									<span>
										{
											checkRole(params.row.role_type)
												.text_name
										}
									</span>
								</el-tag>
							);
						}
					},
					{
						label: "状态",
						prop: "state",
						width: "75",
						render: (h, params) => {
							return (
								<div>
									<i
										class="icon-before"
										style={`background-color:${
											checkFreeze(params.row.state)
												.class_name
										}`}
									/>
									<span class="typeBefore">
										{
											checkFreeze(params.row.state)
												.text_name
										}
									</span>
								</div>
							);
						}
					},
					{ label: "注册时间", prop: "create_time", width: "140" },
					{ label: "最后登录时间", prop: "last_time", width: "140" },
					{ label: "登录IP", prop: "login_ip" },
					{ label: "登陆地区", prop: "loginPlace" }
				],
				// crud的操作按钮配置，基础按钮有添加、修改、删除、查看，还可以配置扩展按钮
				tableBtnConfig: {
					create: true,
					update: true,
					delete: true,
					query: false,
					expands: [
						{
							name: "下载按钮",
							emitName: "download",
							type: "primary"
						}
					]
				}
			},
			table_ajax: recycleApi
		};
	},
	components: {
		baseTable
	},
	created: function() {},
	methods: {
		// 恢复
		refresh: function(id) {},
		// 彻底删除
		deleteThoroughly: function(id) {},
		// 批量恢复
		batchRecovery: function() {
			if (this.multipleSelection[0]) {
			} else {
				this.$message.error("请先选择要恢复的条目");
			}
		},
		// 批量彻底删除
		batchDelete: function() {
			if (this.multipleSelection[0]) {
			} else {
				this.$message.error("请先选择要删除的条目");
			}
		}
	}
};
</script>

