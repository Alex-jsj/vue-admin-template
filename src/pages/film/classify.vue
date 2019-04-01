<template>
	<div id="classify_list">
		<!-- 表格 -->
		<baseTable
			:theApi="table_ajax"
			:table-config="configData.tableConfig"
			:top-btn-config="configData.topBtnConfig"
			:table-btn-config="configData.tableBtnConfig"
			:other-config="configData.otherConfig"
			:filter-config="configData.filterConfig"
			:grid-edit-width="200"
			form-title="分类"
			form-width="60%"
			:form-config="configData.formConfig"
			:form-data="configData.formModel"
		></baseTable>
	</div>
</template>
<script>
// api
import * as theApi from "api/film/classify";
import baseTable from "components/baseTable";
export default {
	name: "classify_list",
	data() {
		return {
			//表格配置
			configData: {
				// 其他配置
				otherConfig: {
					needSelect: true // 是否可以多选
				},
				// 表格数据配置
				tableConfig: [
					{ label: "ID", prop: "id", width: "70" },
					{ label: "标题", prop: "title" },
					{ label: "排序", prop: "sort", width: "60" }
				],
				// 表格内按钮配置
				tableBtnConfig: {
					width: 150, //宽度
					update: true, // 编辑
					delete: true // 删除
				},
				// 表格上方按钮配置
				topBtnConfig: [
					{
						title: "添加分类",
						icon: "el-icon-circle-plus"
					}
				],
				// 筛选组件配置
				filterConfig: {
					filter_list: ["search"],
					search_list: ["标题"]
				},
				// table的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置
				formConfig: [
					{
						span: 12,
						label: "标题",
						prop: "title",
						type: "text",
						rules: {
							required: true,
							message: "请输入标题",
							trigger: "blur"
						}
					},
					{
						span: 12,
						label: "排序",
						prop: "sort",
						type: "el-input-number",
						rules: {
							required: true,
							message: "请输入排序",
							trigger: "change"
						}
					}
				],
				// 表单基础数据类型，需要预先赋值
				formModel: {
					title: "",
					sort: ""
				}
			},
			// ajax
			table_ajax: theApi
		};
	},
	components: { baseTable }
};
</script>
