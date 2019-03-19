<template>
	<!-- contentWidthType==='流式'?'content-width-type-1':'content-width-type-2' -->
	<div id="topBar" :class="{'content-width-type-1':contentWidthType==='流式','content-width-type-2':contentWidthType==='定宽','menuType-2':menuType===2}">
		<div class="content-width-box">
			<!-- 左侧文字信息 -->
			<div class="float-left left-info">
				<router-link to="/pages/index" class="link float-left">
					<!-- text -->
					<p class="logo-text float-left">VUE后台管理系统</p>
				</router-link>
			</div>
			<!-- 右侧用户信息 -->
			<div class="float-right right-info">
				<!-- 头像 -->
				<div class="head-portrait float-right" data-step="2" data-intro="用户信息">
					<el-badge :value="info.content.unread" :max="99" :class="{'badge-show':info.content.unread}">
						<div class="img-container">
							<img :src="info.content.head_img" class="head-img">
						</div>
					</el-badge>
				</div>
				<!-- 用户面板 -->
				<div class="user-board">
					<p class="user-icon">
						<i class="iconfont icon-triangle-top"></i>
					</p>
					<div class="user-board-container">
						<div class="user-board-info">
							<!-- 头像 -->
							<div class="board-touxiang">
								<img :src="info.content.head_img" class="head-img">
							</div>
							<!-- 信息 -->
							<div class="board-text float-right">
								<span class="nick-name float-left">{{info.content.nickName}}</span>
								<span class="float-left">{{info.content.role}}</span>
								<p class="account float-left">{{info.content.account}} (登录用户名)</p>
							</div>
						</div>
						<!-- 操作 -->
						<ul class="user-board-list">
							<li class="item">
								<router-link to="/pages/index/systemManage/systemManage_message" class="link">
									消息通知
									<span v-if="info.content.unread">({{info.content.unread}})</span>
								</router-link>
							</li>
							<li class="item">
								<router-link to="/pages/index/account_information?modify=1" class="link">修改密码</router-link>
							</li>
							<li class="item">
								<router-link to class="link" @click.native="log_out()">退出登录</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 语言切换 -->
			<div class="lan-switch float-right" data-step="1" data-intro="语言切换">
				<i class="iconfont icon-yuyan"></i>
			</div>
			<!-- 全屏 -->
			<div class="full-screen float-right">
				<i class="iconfont icon-quanping"></i>
			</div>
		</div>
	</div>
</template>
<script>
// api
import { logout } from "api/login";
export default {
	name: "topBar",
	data() {
		return {
			imgSrc: "./static/img"
		};
	},
	computed: {
		info: function() {
			return {
				content: {
					account: this.$store.state.account,
					nickName: this.$store.state.nickName,
					role: this.$store.state.role,
					agent_title: this.$store.state.agent_title,
					unread: this.$store.state.unread,
					head_img: "./static/img/head.png"
				}
			};
		},
		contentWidthType() {
			return this.$store.state.contentWidthType;
		},
		menuType() {
			return this.$store.state.menuType;
		}
	},
	methods: {
		// 退出登录
		log_out: function() {
			logout().then(res => {
				if (res.code === 200) {
					localStorage.removeItem("admin_token"); // 移除登录标记
					localStorage.removeItem("mskj_agent_id"); // 如果是承办机构用户登录则一并移除承办机构id
					location.reload(); // 刷新页面
				}
			});
		}
	}
};
</script>

<style lang="less">
@import "~assets/css/mixin.less";
#topBar {
	width: 100vw; // 防抖处理
	height: 60px;
	background: #292c31;
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1500;
	.content-width-box {
		width: 100%;
		height: 100%;
	}
	.left-info {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		.link {
			width: 100%;
			display: block;
		}
		.logo-text {
			font-size: 20px;
			color: #fff;
			line-height: 60px;
			letter-spacing: 3px;
			margin-left: 30px;
		}
	}
	.lan-switch,
	.full-screen {
		margin-right: 20px;
		margin-top: 18px;
		.iconfont {
			color: #fff;
			font-size: 24px;
			display: block;
			// line-height: 60px;
			cursor: pointer;
			&.icon-quanping {
				font-size: 28px;
			}
		}
		&.full-screen {
			margin-top: 15px;
		}
	}
	.right-info {
		height: 100%;
		position: relative;
		margin-right: 30px;
		&:hover {
			.user-board {
				height: 300px;
			}
		}
		.head-portrait {
			width: 40px;
			height: 40px;
			border: 1px solid rgba(255, 255, 255, 1);
			margin-top: 10px;
			border-radius: 50%;
			position: relative;
			cursor: pointer;
			.el-badge {
				display: block;
				.el-badge__content {
					display: none;
					border: none;
					height: 16px;
					line-height: 16px;
				}
				&.badge-show {
					.el-badge__content {
						display: block;
					}
				}
			}
			.img-container {
				width: 40px;
				height: 40px;
				position: relative;
				top: -1px;
				left: -1px;
				overflow: hidden;
				border-radius: 50%;
				cursor: pointer;
				.head-img {
					display: block;
					width: 100%;
					min-height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
		.user-board {
			width: 320px;
			height: 0;
			position: absolute;
			top: 50px;
			right: -30px;
			overflow: hidden;
			.transi;
			.user-icon {
				width: 280px;
				margin: 0 auto;
				height: 16px;
				position: relative;
				overflow: hidden;
				.icon-triangle-top {
					position: absolute;
					right: 15px;
					top: -5px;
					color: @blue;
					font-size: 28px;
				}
			}
			.user-board-container {
				width: 280px;
				margin: 0 auto;
				border-radius: 6px;
				box-shadow: 0 0 15px 0 rgba(119, 119, 119, 0.21);
				overflow: hidden;
				.user-board-info {
					width: 100%;
					height: 100px;
					background: @blue;
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					background-size: 100% 100%;
					position: relative;
					.board-touxiang {
						width: 66px;
						height: 66px;
						border-radius: 50%;
						border: 1px solid #fff;
						position: relative;
						left: 17px;
						top: 17px;
						overflow: hidden;
						.head-img {
							display: block;
							width: 105%;
							min-height: 105%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
					.board-text {
						width: 160px;
						position: absolute;
						top: 50%;
						right: 20px;
						transform: translateY(-50%);
						span {
							font-size: 14px;
							color: #fff;
							margin-top: 2px;
						}
						.nick-name {
							font-size: 18px;
							margin-right: 15px;
							margin-top: 0;
						}
					}
					.account {
						font-size: 14px;
						color: #fff;
						margin-top: 12px;
						width: 100%;
						white-space: nowrap;
					}
				}
				.user-board-list {
					width: 100%;
					padding: 12px 15px;
					background: #fff;
					.item {
						width: 100%;
						.link {
							font-size: 14px;
							color: @black;
							display: block;
							line-height: 34px;
							transition: all 0.3s;
							border-bottom: 1px solid transparent;
							&:hover {
								color: @blue;
								border-bottom: 1px solid #e8e8e8;
							}
						}
					}
				}
			}
		}
	}
	&.content-width-type-1.menuType-2 {
		.content-width-box {
			position: relative;
			.left-info {
				.logo-container {
					width: 215px;
				}
				.logo {
					width: 160px;
					left: 0.55rem;
					transform: translateX(0) translateY(-50%);
				}
			}
			.right-info {
				right: 0.55rem;
			}
		}
	}
	&.content-width-type-2.menuType-2 {
		.content-width-box {
			width: 1230px;
			height: 100%;
			margin: 0 auto;
			position: relative;
			.left-info {
				.logo-container {
					width: 16%;
				}
				.logo {
					width: 85%;
					left: 0;
					transform: translateX(0) translateY(-50%);
				}
			}
			.right-info {
				right: 0;
			}
		}
	}
}
</style>
