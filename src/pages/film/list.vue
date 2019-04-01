<template>
	<div id="film_list">
		<!-- 表格 -->
		<baseTable
			:theApi="table_ajax"
			:table-config="configData.tableConfig"
			:top-btn-config="configData.topBtnConfig"
			:table-btn-config="configData.tableBtnConfig"
			:other-config="configData.otherConfig"
			:filter-config="configData.filterConfig"
		></baseTable>
	</div>
</template>
<script>
// api
import * as theApi from "api/film/list";
import baseTable from "components/baseTable";
export default {
	name: "film_list",
	data() {
		return {
			//表格配置
			configData: {
				otherConfig: {
					needSelect: true // 是否可以多选
				},
				tableConfig: [
					{ label: "ID", prop: "id", width: "70" },
					{ label: "片名", prop: "title" },
					{ label: "分类", prop: "classify" },
					{ label: "影片推荐", prop: "recommend" },
					{ label: "年份", prop: "year" },
					{
						label: "国家",
						prop: "country",
						render: (h, params) => {
							return <span>{params.row.country.join(",")}</span>;
						}
					},
					{ label: "影片语言", prop: "lang" },
					{ label: "时长", prop: "time" },
					{ label: "导演", prop: "director" },
					{ label: "类型", prop: "type" }
				],
				tableBtnConfig: {
					width: 150, //宽度
					update: true, // 编辑
					isUpdateInNewPage: true, // 是否跳转新页面编辑
					updateAddress: "/pages/index/film/edit", // 跳转新页面编辑地址
					delete: true // 删除
				},
				topBtnConfig: [
					{
						title: "添加影片",
						icon: "el-icon-circle-plus",
						jumpPage: true, // 是否跳新页面
						jumpAddress: "/pages/index/film/add"
					}
				],
				filterConfig: {
					filter_list: ["search", "classify", "year", "recommend"],
					search_list: ["片名", "国家", "导演"]
				}
			},
			// ajax
			table_ajax: theApi
		};
	},
	components: { baseTable }
};
</script>
