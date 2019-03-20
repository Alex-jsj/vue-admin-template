<template>
	<div id="login">
		<!-- 背景特效 -->
		<canvas id="bgCanvas"></canvas>
		<!-- 登录框 -->
		<div class="login-container">
			<!-- text s -->
			<p class="login-title-1">欢迎使用</p>
			<p class="login-title-2">VUE后台管理系统</p>
			<!-- 登录 -->
			<form class="login-box">
				<!-- user -->
				<div class="user inp">
					<i class="iconfont icon-user"></i>
					<input v-model="user_text" :class="user_err == ''?'':'no'" type="text" placeholder="请输入用户名(admin1)" @blur="userCheck()">
					<!-- 错误提示语 -->
					<p class="err-text">{{user_err}}</p>
				</div>
				<!-- password -->
				<div class="password inp">
					<i class="iconfont icon-password"></i>
					<input
						v-model="psd_text"
						:class="psd_err == ''?'':'no'"
						:type="show_pwd?'text':'password'"
						placeholder="请输入密码(123456)"
						@blur="psdCheck()"
						@keyup.enter="submit()"
					>
					<i class="iconfont icon-look" :class="{'show-pwd':show_pwd}" :title="!show_pwd?'显示密码':'隐藏密码'" @click="show_pwd = !show_pwd"></i>
					<!-- 错误提示语 -->
					<p class="err-text">{{psd_err}}</p>
				</div>
				<!-- 验证码 -->
				<div class="captcha inp" v-if="captcha_key">
					<i class="iconfont icon-captcha"></i>
					<input ref="captchaInput" v-model="captcha_text" :class="captcha_err == ''?'':'no'" placeholder="请输入计算结果" @blur="captchaCheck()" @keyup.enter="submit()">
					<!-- 错误提示语 -->
					<p class="err-text">{{captcha_err}}</p>
					<img :src="captcha_img" @click="updateCaptcha">
				</div>
				<!-- <el-checkbox v-model="autoLogin">自动登录</el-checkbox> -->
				<span class="forget-psd" :class="{'forget-psd-open':explain_switch}" @click="explain_switch = !explain_switch">忘记密码</span>
				<el-button class="login-btn my-button" type="primary" @click="submit()" :loading="loading" size="small">登&nbsp;&nbsp;&nbsp;录</el-button>
				<!-- 登录说明 -->
				<div class="login-explain" :class="{'explain-open':explain_switch}">
					<!-- 说明信息 -->
					<ul class="explain-info float-left">
						<li class="item">· 请联系系统管理员</li>
						<li class="item">· 电话：+86 15395830398</li>
						<li class="item">· 邮箱：329255122@qq.com</li>
					</ul>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
// api
import * as theApi from "api/login";
import { format_permissions_arr } from "common/js/public"; // 格式化权限列表

export default {
	name: "login",
	data() {
		return {
			// 自动登录
			autoLogin: true,
			explain_switch: false,
			loading: false,
			// 显示密码
			show_pwd: false,
			// 用户名
			user_text: "",
			// 密码
			psd_text: "",
			// 验证码
			captcha_img: "",
			captcha_key: "",
			captcha_text: "",
			// 用户名错误提示语
			user_err: "",
			// 密码错误提示语
			psd_err: "",
			// 验证码错误提示语
			captcha_err: "",
			// 定时器
			timer: null
		};
	},
	mounted: function() {
		// 背景特效
		this.bg_canvas();
	},
	methods: {
		// 背景特效
		bg_canvas: function() {
			//定义画布宽高和生成点的个数
			var WIDTH =
				window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth; //width
			var HEIGHT =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight; //height
			var POINT = 30;

			var canvas = document.getElementById("bgCanvas");
			(canvas.width = WIDTH), (canvas.height = HEIGHT);
			var context = canvas.getContext("2d");
			(context.strokeStyle = "rgba(255,255,255,0.3)"),
				(context.strokeWidth = 1),
				(context.fillStyle = "rgba(255,255,255,0.2)");
			var circleArr = [];
			//线条：开始xy坐标，结束xy坐标，线条透明度
			function Line(x, y, _x, _y, o) {
				(this.beginX = x),
					(this.beginY = y),
					(this.closeX = _x),
					(this.closeY = _y),
					(this.o = o);
			}
			//点：圆心xy坐标，半径，每帧移动xy的距离
			function Circle(x, y, r, moveX, moveY) {
				(this.x = x),
					(this.y = y),
					(this.r = r),
					(this.moveX = moveX),
					(this.moveY = moveY);
			}
			//生成max和min之间的随机数
			function num(max, _min) {
				var min = arguments[1] || 0;
				return Math.floor(Math.random() * (max - min + 1) + min);
			}
			// 绘制原点
			function drawCricle(cxt, x, y, r, moveX, moveY) {
				var circle = new Circle(x, y, r, moveX, moveY);
				cxt.beginPath();
				cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
				cxt.closePath();
				cxt.fill();
				return circle;
			}
			//绘制线条
			function drawLine(cxt, x, y, _x, _y, o) {
				var line = new Line(x, y, _x, _y, o);
				cxt.beginPath();
				cxt.strokeStyle = "rgba(255,255,255," + o + ")";
				cxt.moveTo(line.beginX, line.beginY);
				cxt.lineTo(line.closeX, line.closeY);
				cxt.closePath();
				cxt.stroke();
			}
			//初始化生成原点
			function init() {
				circleArr = [];
				for (var i = 0; i < POINT; i++) {
					circleArr.push(
						drawCricle(
							context,
							num(WIDTH),
							num(HEIGHT),
							num(20, 2),
							num(10, -10) / 40,
							num(10, -10) / 40
						)
					);
				}
				draw();
			}
			//每帧绘制
			function draw() {
				context.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < POINT; i++) {
					drawCricle(
						context,
						circleArr[i].x,
						circleArr[i].y,
						circleArr[i].r
					);
				}
				for (var i = 0; i < POINT; i++) {
					for (var j = 0; j < POINT; j++) {
						if (i + j < POINT) {
							var A = Math.abs(
									circleArr[i + j].x - circleArr[i].x
								),
								B = Math.abs(
									circleArr[i + j].y - circleArr[i].y
								);
							var lineLength = Math.sqrt(A * A + B * B);
							var C = (1 / lineLength) * 7 - 0.009;
							var lineOpacity = C > 0.03 ? 0.03 : C;
							if (lineOpacity > 0) {
								drawLine(
									context,
									circleArr[i].x,
									circleArr[i].y,
									circleArr[i + j].x,
									circleArr[i + j].y,
									lineOpacity
								);
							}
						}
					}
				}
			}
			//调用执行
			init();
			// 将定时器申明在window方便清除
			this.timer = setInterval(function() {
				for (var i = 0; i < POINT; i++) {
					var cir = circleArr[i];
					cir.x += cir.moveX;
					cir.y += cir.moveY;
					if (cir.x > WIDTH) cir.x = 0;
					else if (cir.x < 0) cir.x = WIDTH;
					if (cir.y > HEIGHT) cir.y = 0;
					else if (cir.y < 0) cir.y = HEIGHT;
				}
				draw();
			}, 16);
		},
		// 验证用户名
		userCheck: function() {
			let reg = /^[0-9a-zA-Z_]{6,20}$/; //6-20位数字字母
			if (this.user_text == "") {
				this.user_err = "用户名不能为空!";
				return false;
			} else if (!reg.test(this.user_text)) {
				this.user_err = "用户名应为6~20位数字/字母/下划线!";
				return false;
			} else {
				this.user_err = "";
				return true;
			}
		},
		// 验证密码
		psdCheck: function() {
			let reg = /^[0-9a-zA-Z_]{6,15}$/; //3-18位数字字母下划线
			if (this.psd_text == "") {
				this.psd_err = "密码不能为空!";
				return false;
			} else if (!reg.test(this.psd_text)) {
				this.psd_err = "密码应为6~15位，英文与数字或下划线组合!";
				return false;
			} else {
				this.psd_err = "";
				return true;
			}
		},
		// 验证验证码
		captchaCheck: function() {
			if (this.captcha_text == "") {
				this.captcha_err = "验证码不能为空!";
				return false;
			} else {
				this.captcha_err = "";
				return true;
			}
		},
		// 获取验证码
		updateCaptcha: async function() {
			let res = await theApi.captcha();
			if (res.code === 200) {
				this.captcha_key = res.data.key;
				this.captcha_img = res.data.img;
				this.autoFocus();
			}
		},
		// 登录
		submit: function(isForce) {
			// 表单验证
			this.userCheck();
			this.psdCheck();
			if (this.captcha_key) {
				// ajax
				if (
					this.userCheck() &&
					this.psdCheck() &&
					this.captchaCheck()
				) {
					this.loading = true;
					let data = {
						account: this.user_text, //账号
						passwd: this.psd_text, //密码
						captcha_key: this.captcha_key, //验证码 key
						captcha_value: this.captcha_text, //验证码 value
						force: isForce // 强制登录 1
					};
					this.loginSubmit(data);
				}
			} else {
				// 获取验证码
				this.updateCaptcha();
			}
		},
		// 登录ajax
		loginSubmit: async function(data) {
			let res = await theApi.login(data);
			this.loading = false;
			if (res.code === 200) {
				if (
					res.msg === "Success" &&
					this.user_text === "admin1" &&
					this.psd_text === "123456"
				) {
					const respon = res.data || {};
					// 获取数据成功
					this.$message.success("登陆成功!");
					// 保存登录标记
					if (respon.token) {
						localStorage.setItem("admin_token", respon.token);
						// 保存登录过期时间 2小时
						localStorage.setItem(
							"admin_token_time",
							new Date().getTime()
						);
					}
					respon.permissions &&
						localStorage.setItem(
							"admin_permissions",
							JSON.stringify(
								format_permissions_arr(respon.permissions)
							)
						); // 权限
					// 跳转到首页
					this.$router.push({
						path: "./pages/index"
					});
				} else if (res.msg === "AlreadyOnline") {
					this.$confirm(
						"您的帐号已经登录系统，是否继续登录？（如非本人操作，建议您修改密码以确保帐号安全）",
						"提示",
						{
							confirmButtonText: "继续登录",
							cancelButtonText: "取消",
							type: "warning"
						}
					)
						.then(() => {
							this.submit(1);
						})
						.catch(() => {
							this.$message.info("取消登录");
						});
				} else {
					this.$message.error("账号或密码错误!");
				}
			}
		},
		// 自动聚焦到验证码输入框
		autoFocus: function() {
			this.$nextTick(() => {
				this.$refs.captchaInput.focus();
			});
		}
	},
	destroyed: function() {
		// 离开时清除canvas背景图的定时器
		clearInterval(this.timer);
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";

#login {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: url("../../static/img/login_background@2x.png") no-repeat;
	background-size: cover;
	background-position: center;
	position: relative;
	#bgCanvas {
		position: absolute;
		top: 0;
		left: 0;
	}
	.login-container {
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 11.45rem;
		background: #fff;
		box-shadow: 0.13rem 0.13rem 0.63rem 0rem rgba(179, 179, 179, 0.25);
		border-radius: 0.2rem;
		overflow: hidden;
		padding: 0 1.13rem;
		padding-bottom: 3vh;
		.login-title-1 {
			font-size: 0.5rem;
			color: @black_2;
			text-align: center;
			margin-top: 3.7vh;
			font-weight: 600;
		}
		.login-title-2 {
			width: 100%;
			height: 0.75rem;
			font-size: 0.55rem;
			color: @grey_2;
			text-align: center;
			margin-top: 1.29vh;
			text-align: justify;
			font-weight: 600;
			&::after {
				content: " ";
				display: inline-block;
				width: 100%;
			}
		}
		// 登录框样式
		.login-box {
			width: 100%;
			margin-top: 2.22vh;
			.user,
			.password,
			.captcha {
				width: 100%;
				height: 1rem;
				position: relative;
				input {
					width: 100%;
					height: 100%;
					font-size: 0.4rem;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					padding-left: 1rem;
					line-height: 1.1rem;
					border-radius: 0.1rem;
					border: 0.025rem solid @grey;
					// placeholder color
					&::placeholder {
						color: @grey;
					}
				}
				.yes {
					border: 0.025rem solid @red;
				}
				.no {
					border: 0.025rem solid @red;
				}
				.icon-user,
				.icon-captcha,
				.icon-password {
					color: @grey_2;
					position: absolute;
					top: 50%;
					left: 0.3rem;
					transform: translateY(-50%);
					font-size: 0.5rem;
					z-index: 2;
				}
				.icon-user {
					top: 45%;
				}
				.err-text {
					position: absolute;
					font-size: 0.3rem;
					color: @red;
					right: 0;
					bottom: -0.45rem;
				}
			}
			.password {
				margin-top: 2.22vh;
				.icon-look {
					color: @grey_2;
					position: absolute;
					top: 45%;
					right: 0.3rem;
					transform: translateY(-50%);
					font-size: 0.5rem;
					cursor: pointer;
					transition: all 0.3s;
				}
				.show-pwd {
					color: @blue;
				}
			}
			.captcha {
				margin-top: 2.22vh;
				input {
					width: 5.5rem;
				}
				img {
					display: block;
					width: 3rem;
					height: 100%;
					float: right;
					cursor: pointer;
					border-radius: 4px;
				}
			}
			.forget-psd {
				color: @grey;
				font-size: 0.3rem;
				text-align: right;
				display: block;
				margin: 2.5vh 0 2vh 0;
				cursor: pointer;
				.transi;
				&:hover {
					color: darken(@grey, 30%);
				}
				&.forget-psd-open {
					color: @blue;
				}
			}
			.login-btn {
				width: 100%;
				display: block;
				font-size: 0.4rem;
			}
		}
		.login-explain {
			width: 100%;
			margin-top: 2vh;
			&::after {
				content: "";
				display: block;
				visibility: hidden;
				clear: both;
			}
			.explain-info {
				width: 100%;
				border-top: 1px solid #d9d9d9;
				margin-top: 0;
				padding: 0;
				opacity: 0;
				// transition: opacity 0.3s, padding 0.3s, margin-top 0.3s;
				transition: all 0.3s;
				.item {
					width: 100%;
					height: 0;
					font-size: 14px;
					color: #636363;
					line-height: 0.53rem;
					white-space: nowrap;
					opacity: 0;
					overflow: hidden;
					transition: all 0.3s;
				}
			}
			&.explain-open {
				.explain-info {
					padding: 1.03vh 0;
					margin-top: 1.2vh;
					opacity: 1;
					.item {
						height: 0.53rem;
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>


