<template>
	<div id="add_edit">
		<el-form :model="form" label-width="110px" :rules="rules" ref="form" style="width:1000px;margin:0 auto;">
			<el-form-item label="语言：" prop="lan" :error="formError.lan">
				<el-select v-model="form.lan" style="width:100%;">
					<el-option v-for="(item,index) in ['中文', 'English']" :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分类：" prop="classify" :error="formError.classify">
				<el-select v-model="form.classify" style="width:100%;">
					<el-option v-for="(item,index) in classifyList" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="年份：" prop="year" :error="formError.year">
				<el-select v-model="form.year" style="width:100%;">
					<el-option v-for="(item,index) in years" :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="片名：" prop="title" :error="formError.title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="影片语言：" prop="filmLang" :error="formError.filmLang">
				<el-input v-model="form.filmLang"></el-input>
			</el-form-item>
			<el-form-item label="时长：" prop="time" :error="formError.time">
				<el-input v-model="form.time"></el-input>
			</el-form-item>
			<el-form-item label="导演：" prop="director" :error="formError.director">
				<el-input v-model="form.director"></el-input>
			</el-form-item>
			<el-form-item label="类型：" prop="type" :error="formError.type">
				<el-input v-model="form.type"></el-input>
			</el-form-item>
			<el-form-item label="获奖影片推荐：">
				<el-cascader :options="recommendList" v-model="form.recommend" style="width:100%;"></el-cascader>
			</el-form-item>
			<el-form-item label="展示图片：" prop="photo" :error="formError.photo">
				<cropper :config="uploadConfig" :id="'id1'"></cropper>
			</el-form-item>
			<el-form-item label="视频文件：" prop="video" :error="formError.video">
				<el-input v-model="form.video" type="file"></el-input>
			</el-form-item>
			<el-form-item label="简介：">
				<!-- 富文本编辑器 -->
				<tinymceEditor></tinymceEditor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="my-button" size="small" :loading="loading" @click="submitForm()">提 交</el-button>
				<el-button class="my-button" size="small" @click="resetForm()">重 置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
// api
import * as theApi from "api/film/list";
import tinymceEditor from "components/tinymce/tinymceEditor"; // 富文本编辑器
import cropper from "components/cropper"; // 图片裁剪
export default {
	name: "film_add_edit",
	data() {
		return {
			recommendList: [
				{
					value: "tm",
					label: "D20提名",
					children: [
						{
							value: "shejiyuanze",
							label: "D20年度作品"
						},
						{
							value: "daohang",
							label: "D20年度作者"
						},
						{
							value: "daohang",
							label: "D20年度新锐"
						}
					]
				},
				{
					value: "ct",
					label: "IDF创投",
					children: [
						{
							value: "yx",
							label: "IDF优选提案"
						}
					]
				},
				{
					value: "py",
					label: "IDF培育计划",
					children: [
						{
							value: "2",
							label: "最具潜力发展计划"
						}
					]
				}
			],
			classifyList: [
				{
					id: 1,
					title: "D20提名"
				},
				{
					id: 2,
					title: "IDF创投"
				},
				{
					id: 3,
					title: "IDF论坛"
				}
			],
			years: ["2017", "2018", "2019"],
			// 图片上传地址
			uploadUrl: `${process.env.API_ROOT}/student_attach`,
			// 数据loading
			loading: false,
			// form
			form: {
				lan: "中文",
				title: "",
				photo: "",
				video: "",
				classify: "",
				type: "",
				time: "",
				director: "",
				recommend: [],
				filmLang: ""
			},
			// 后端错误提示
			formError: {
				photo: ""
			},
			rules: {
				title: [
					{ required: true, message: "请输入片名", trigger: "blur" }
				],
				type: [
					{ required: true, message: "请输入类型", trigger: "blur" }
				],
				time: [
					{ required: true, message: "请输入时长", trigger: "blur" }
				],
				director: [
					{ required: true, message: "请输入导演", trigger: "blur" }
				],
				filmLang: [
					{
						required: true,
						message: "请输入影片语言",
						trigger: "blur"
					}
				],
				year: [
					{ required: true, message: "请选择年份", trigger: "change" }
				],
				lan: [
					{ required: true, message: "请选择语言", trigger: "change" }
				],
				classify: [
					{ required: true, message: "请选择分类", trigger: "change" }
				],
				photo: [
					{ required: true, message: "请选择图片", trigger: "change" }
				],
				video: [
					{
						required: true,
						message: "请上传视频",
						trigger: "change"
					}
				]
			},
			uploadConfig: {
				ajaxAddress: `https://jsonplaceholder.typicode.com/posts/`,
				autoCropWidth: 200,
				autoCropHeight: 200
			}
		};
	},
	props: {
		type: String // add edit
	},
	components: { tinymceEditor, cropper },
	methods: {
		// 重置
		resetForm: function() {
			this.$refs.form.resetFields(); // 对该表单项进行重置，将其值重置为初始值并移除校验结果
			this.formError = {}; // 移除后端校验结果
		},
		// 弹框内容提交
		submitForm() {
			const that = this;
			that.formError = {};
			that.$refs["form"].validate(function(valid) {
				if (valid) {
					that.loading = true;
					// data
					let data = JSON.parse(JSON.stringify(that[_form]));
					// ajax
					let match_name = `${that.type}Item`;
					for (let key in theApi) {
						if (match_name === key) {
							// ajax
							theApi[key](data)
								.then(res => {
									that.loading = false;
									if (res.code === 200) {
										// 关闭弹框
										if (formName == "add") {
											// 新增
											that.$message.success("新增成功");
										} else {
											// 编辑
											that.$message.success(
												"数据更新成功"
											);
										}
									} else {
										// 在表单中输出错误提示
										const errList = res.errors || "";
										if (errList) {
											for (let key in errList) {
												errList[key] = errList[key][0];
											}
											that.formError = errList;
										}
									}
								})
								.catch(() => {
									that.loading = false;
								});
						}
					}
				} else {
					that.loading = false;
				}
			});
		}
	}
};
</script>
