<template>
	<div id="account_information">
		<el-tabs v-model="activeName">
			<el-tab-pane label="修改个人信息" name="first">
				<el-form :model="formInfo" label-width="120px" ref="formInfo" class="form" :rules="rulesInfo">
					<el-form-item label="姓名/昵称：" :error="formErrorInfo.name">
						<el-input v-model="formInfo.name" size="small"></el-input>
					</el-form-item>
					<el-form-item label="手机号：" :error="formErrorInfo.phone">
						<el-input v-model="formInfo.phone" size="small"></el-input>
					</el-form-item>
					<el-form-item label="区域：" :error="formErrorInfo.district_id">
						<el-cascader size="small" :options="cities" style="width: 100%;" v-model="formInfo.district_path" clearable filterable placeholder="请选择地区"></el-cascader>
					</el-form-item>
					<el-form-item label="地址：" :error="formErrorInfo.address">
						<el-input v-model="formInfo.address" size="small"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" :loading="loading" @click="submit('formInfo')" class="btn my-button">确定</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="修改密码" name="second">
				<el-form :model="formPsd" label-width="120px" ref="formPsd" class="form" :rules="rulesPsd">
					<el-form-item label="账号：">
						<el-input v-model="formPsd.account" size="small" disabled></el-input>
					</el-form-item>
					<el-form-item label="原密码：" prop="old_passwd" :error="formErrorPsd.old_passwd">
						<el-input v-model="formPsd.old_passwd" size="small" type="password"></el-input>
					</el-form-item>
					<el-form-item label="新密码：" prop="passwd" :error="formErrorPsd.passwd">
						<el-input v-model="formPsd.passwd" size="small" type="password"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码：" prop="passwd_confirmation" :error="formErrorPsd.passwd_confirmation">
						<el-input v-model="formPsd.passwd_confirmation" size="small" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" :loading="loading" @click="submit('formPsd')" class="btn my-button">确定</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
// api
import { modifyPersonalInfo } from "api/personal_information";
import { logout } from "api/login";

export default {
	// 个人信息
	name: "account_information",
	data() {
		const that = this;
		return {
			activeName: "second",
			// 用户信息
			formInfo: {
				name: this.$store.state.nickName,
				phone: this.$store.state.phone
			},
			formPsd: {
				account: this.$store.state.account
			},
			rulesInfo: {},
			// 表单验证
			rulesPsd: {
				old_passwd: [
					{
						required: true,
						validator: function(rule, value, callback) {
							var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
							if (!value) {
								callback(new Error("密码不能为空"));
							} else if (reg.test(value) == false) {
								callback(
									new Error(
										"密码必须为6~15位，英文与数字或下划线组合"
									)
								);
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				passwd: [
					{
						required: true,
						validator: function(rule, value, callback) {
							var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
							if (!value) {
								callback(new Error("请输入新密码"));
								// callback();
							} else if (reg.test(value) == false) {
								callback(
									new Error(
										"密码必须为6~15位，英文与数字或下划线组合"
									)
								);
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				passwd_confirmation: [
					{
						required: true,
						validator: function(rule, value, callback) {
							var reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
							if (!value) {
								callback(new Error("请再次输入密码"));
								// callback();
							} else if (reg.test(value) == false) {
								callback(
									new Error(
										"密码必须为6~15位，英文与数字或下划线组合"
									)
								);
							} else if (value !== that.formPsd.passwd) {
								callback(new Error("两次输入密码不一致!"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			},
			// 后端返回错误提示
			formErrorInfo: {},
			formErrorPsd: {},
			loading: false
		};
	},
	computed: {
		// 市
		cities() {
			return this.$store.state.filterInfo.cities;
		}
	},
	created() {
		// 根据跳转参数切换
		if (this.$route.query.modify == 1) {
			this.activeName = "second";
		} else {
			this.activeName = "first";
		}
	},
	methods: {
		// 更新用户信息
		submit: function(formName) {
			const that = this;
			that.formError = {};
			that.$refs[formName].validate(valid => {
				if (valid) {
					that.loading = true;
					let data;
					if (formName === "formInfo") {
						that.loading = false;
						data = that.formInfo;
						// 清理为空字段
						for (let key in data) {
							if (data[key] === "") {
								delete data[key];
							}
						}
					} else {
						data = that.formPsd;
						that.axiosPost(data);
					}
				}
			});
		},
		// ajax
		axiosPost: function(data) {
			const that = this;
			// 验证通过
			modifyPersonalInfo(data)
				.then(res => {
					that.loading = false;
					if (res.code === 200) {
						// 获取数据成功
						that.$confirm("密码更新成功，需要重新登录", "提示", {
							confirmButtonText: "重新登录",
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							closeOnPressEscape: false,
							type: "warning"
						}).then(() => {
							// 退出登录
							logout().then(res => {
								if (res.code === 200) {
									localStorage.removeItem("admin_token"); // 移除登录标记
									location.reload(); // 刷新页面
								}
							});
						});
					} else {
						// 在表单中输出错误提示
						const errList = res.errors || "";
						if (errList) {
							for (let key in errList) {
								errList[key] = errList[key][0];
							}
							that.formErrorPsd = errList;
						}
					}
				})
				.catch(() => {
					that.loading = false;
				});
		}
	}
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#account_information {
	.form {
		width: 15rem;
		margin: 0 auto;
		.btn {
			padding: 9px 30px;
		}
	}
}
</style>
