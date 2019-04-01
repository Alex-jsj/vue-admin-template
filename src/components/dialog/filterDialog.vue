<template>
	<div id="filterDialog">
		<el-dialog :title="config.title" top="25vh" :visible.sync="formDialog" @close="closeDialog()">
			<el-form :model="form" label-width="100px" :rules="rules" ref="form">
				<el-form-item v-if="config.showList.indexOf('cbjg') > -1 && role != '承办单位'" label="承办机构：" prop="cbjg" :error="formError[config.cbjg.field]">
					<el-select v-model="form.cbjg" style="width:100%;" placeholder="请选择承办机构"  @change="changeCbjg()" filterable>
						<el-option v-for="(item,index) in cbjgList" :key="index.id" :label="item.code+'-'+item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="config.showList.indexOf('kaoci') > -1" label="考次：" prop="kaoci" :error="formError[config.kaoci.field]">
					<el-select v-model="form.kaoci" style="width:100%;" placeholder="请选择考次"  @change="matchPiciChangci()" filterable>
						<el-option v-for="(item,index) in kaociList" :key="index.id" :label="item.code+'-'+item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="config.showList.indexOf('pici') > -1" label="批次：" prop="pici" :error="formError[config.pici.field]">
					<el-select v-model="form.pici" style="width:100%;" placeholder="请选择批次"  clearable filterable>
						<el-option v-for="(item,index) in piciList" :key="index.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="config.showList.indexOf('changci') > -1" label="场次：" prop="changci" :error="formError[config.changci.field]">
					<el-select v-model="form.changci" style="width:100%;" placeholder="请选择场次"  clearable filterable>
						<el-option v-for="(item,index) in changciList" :key="index.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="config.showList.indexOf('chengji') > -1" label="成绩：" prop="chengji" :error="formError[config.chengji.field]">
					<el-radio-group v-model="form.chengji">
						<el-radio :label="1">合格</el-radio>
						<el-radio :label="-1">不合格</el-radio>
						<el-radio :label="-2">缺考</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="config.showList.indexOf('leixing') > -1" label="类型：" prop="leixing" :error="formError[config.leixing.field]">
					<el-radio-group v-model="form.leixing">
						<el-radio :label="1">正联</el-radio>
						<el-radio :label="2">副联</el-radio>
						<el-radio :label="3">正副联</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="my-button" size="small" :loading="formLoading" @click="submitDialog()">确 定</el-button>
					<el-button class="my-button" size="small" @click="resetForm()">重 置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import axios from "utils/http";
// api
import {
	get_cbjg,
	get_kaoci,
	get_pici,
	get_changci
} from "api/filterGroup/apis";

export default {
	// 公用的 含有 承办机构 考次 批次 场次 筛选的弹框
	name: "filterDialog",
	data() {
		return {
			cbjgList: [],
			kaociList: [],
			piciList: [],
			piciAll: [],
			changciList: [],
			changciAll: [],
			// 表单数据
			form: {
				cbjg: "", // 承办机构
				kaoci: "", // 考次
				pici: "", // 批次
				changci: "", // 场次
				chengji: 1, // 成绩
				leixing: 1 // 类型
			},
			formLoading: false,
			formDialog: false,
			// 后端返回错误提示
			formError: {},
			//表单验证
			rules: {
				cbjg: [
					{
						required: this.config.cbjg
							? this.config.cbjg.required
							: false,
						message: "请选择承办机构",
						trigger: "change"
					}
				],
				kaoci: [
					{
						required: this.config.kaoci
							? this.config.kaoci.required
							: false,
						message: "请选择考次",
						trigger: "change"
					}
				],
				pici: [
					{
						required: this.config.pici
							? this.config.pici.required
							: false,
						message: "请选择批次",
						trigger: "change"
					}
				],
				changci: [
					{
						required: this.config.changci
							? this.config.changci.required
							: false,
						message: "请选择场次",
						trigger: "change"
					}
				],
				chengji: [
					{
						required: this.config.chengji
							? this.config.chengji.required
							: false,
						message: "请选择成绩",
						trigger: "change"
					}
				],
				leixing: [
					{
						required: this.config.leixing
							? this.config.leixing.required
							: false,
						message: "请选择类型",
						trigger: "change"
					}
				]
			}
		};
	},
	props: {
		isFormDialog: false,
		// 配置
		config: Object
	},
	computed: {
		// 角色组
		role() {
			return this.$store.state.role;
		}
	},
	watch: {
		isFormDialog(newValue) {
			if (newValue) {
				this.formDialog = true;
				if (
					this.role === "承办单位" &&
					localStorage.getItem("mskj_agent_id")
				) {
					this.changeCbjg(localStorage.getItem("mskj_agent_id"));
				} else {
					get_cbjg().then(res => {
						if (res.code === 200) {
							this.cbjgList = res.data || [];
						}
					});
				}
			}
		}
	},
	methods: {
		// 提交
		submitDialog: function() {
			const that = this;
			that.formError = {};
			that.$refs.form.validate(function(valid) {
				if (valid) {
					that.formLoading = true;
					// data
					const default_data = JSON.parse(JSON.stringify(that.form));
					let data = {};
					// 匹配字段名并清除空值的字段
					for (let key in default_data) {
						if (that.config[key] && default_data[key] != "") {
							data[that.config[key].field] = default_data[key];
						}
					}
					that.sendAjax(data);
				} else {
					that.formLoading = false;
				}
			});
		},
		// ajax
		sendAjax: function(data) {
			const that = this;
			// ajax
			axios
				.post(that.config.ajaxAddress, data)
				.then(res => {
					that.formLoading = false;
					if (res.code === 200) {
						if (
							that.config.cjNeedConfirm &&
							res.data.hasOwnProperty("set_exam_result_num") &&
							res.data.set_exam_result_num[0]
						) {
							// 需要二次确认而且有学生已经录入过成绩
							this.confirmAgain(
								data,
								res.data.set_exam_result_num
							);
						} else {
							// 不需要二次确认，直接走成功提示
							if (that.config.tipMode === "message") {
								// 提示消息方式 message notify
								that.$message.success(
									`${that.config.tipText}成功!`
								);
							} else {
								that.$notify({
									title: that.config.tipText,
									message: res.data,
									type: "success"
								});
							}
							if (that.config.needRefresh) {
								// 成功后是否需要刷新列表
								that.$emit("dialogChange", true, true);
							}
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
				.catch(err => {
					that.formLoading = false;
				});
		},
		// 二次确认
		confirmAgain: function(data, list) {
			const that = this;
			if (that.config.cjNeedConfirm) {
				// 成绩录入 确认用
				that.confirmText = "该场次已录入过成绩，是否重新录入?";
			}
			// el-icon-warning
			const h = that.$createElement;
			that.$msgbox({
				title: "提示",
				message: h("div", null, [
					h("p", { style: "margin-bottom: 15px" }, [
						h(
							"i",
							{
								class: "el-icon-warning",
								style: {
									color: "#E6A23C",
									"font-size": "16px",
									"margin-right": "5px",
									"line-height": "24px"
								}
							},
							""
						),
						h(
							"span",
							{
								style: {
									color: "#E6A23C",
									"font-size": "14px",
									"line-height": "24px"
								}
							},
							that.confirmText
						)
					]),
					h("p", null, "以下为该场次已录入成绩的考生:"),
					h("p", { style: "color: #909399" }, list.join(" , "))
				]),
				showCancelButton: true,
				confirmButtonText: "确定",
				cancelButtonText: "取消"
			})
				.then(() => {
					data.set_exam_result_again = true; // 强制覆盖录入
					that.sendAjax(data);
				})
				.catch(() => {
					that.formLoading = false;
				});
		},
		// 根据承办机构id获取批次、考次、场次
		changeCbjg: function(the_agent_id) {
			const that = this;
			// data
			let data = {};
			data.agent_id = the_agent_id ? the_agent_id : that.form.cbjg;
			// 考次
			if (that.config.showList.indexOf("kaoci") > -1) {
				that.form.kaoci = "";
				that.kaociList = [];
				get_kaoci(data).then(res => {
					if (res.code === 200) {
						that.kaociList = res.data || [];
					}
				});
			}
			// 批次
			if (that.config.showList.indexOf("pici") > -1) {
				that.form.pici = "";
				that.piciList = [];
				that.piciAll = [];
				get_pici(data).then(res => {
					if (res.code === 200) {
						let respon = res.data || [];
						that.piciAll = respon.data || [];
					}
				});
			}
			// 场次
			if (that.config.showList.indexOf("changci") > -1) {
				that.form.changci = "";
				that.changciList = [];
				that.changciAll = [];
				get_changci(data).then(res => {
					if (res.code === 200) {
						let respon = res || [];
						that.changciAll = respon.data || [];
					}
				});
			}
		},
		// 根据考次匹配批次和场次
		matchPiciChangci: function() {
			const that = this;
			if (that.config.showList.indexOf("pici") > -1) {
				that.form.pici = "";
				that.piciList = [];
				that.piciAll.map(item => {
					if (item.season_id == that.form.kaoci) {
						that.piciList.push(item);
					}
				});
			}
			if (that.config.showList.indexOf("changci") > -1) {
				that.form.changci = "";
				that.changciList = [];
				that.changciAll.map(item => {
					if (item.season_id == that.form.kaoci) {
						that.changciList.push(item);
					}
				});
			}
		},
		// 重置
		resetForm: function() {
			this.$refs.form.resetFields(); // 对该表单项进行重置，将其值重置为初始值并移除校验结果
			this.formError = {}; // 移除后端校验结果
		},
		// 关闭dialog后清除验证规则
		closeDialog() {
			this.resetForm();
			this.$emit("dialogChange", false); // 传递弹框关闭状态到父组件
		}
	}
};
</script>
