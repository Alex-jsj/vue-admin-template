<template>
	<div id="page404">
		<p class="num" :class="{'numShow':num_show}">404!</p>
		<p class="text" :class="{'textShow':num_show}">Page Not Found</p>
		<div class="btn" :class="{'btnShow':num_show}">
			<router-link to="/pages/index" class="link">{{$t('404.backToHome')}}</router-link>
			<router-link to @click.native="$router.back(-1)" class="link">{{$t('404.backToPrev')}}</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "page404",
	data() {
		return {
			num_show: false
		};
	},
	mounted: function() {
		let that = this;
		that.num_show = true;
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#page404 {
	width: 100%;
	height: 100vh;
	background: url("../../static/img/login_background@2x.png") no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
	position: relative;
	.num {
		font-size: 7rem;
		text-align: center;
		color: @red;
		opacity: 0.45;
		position: absolute;
		bottom: -52vh;
		left: 50%;
		transform: translateX(-50%);
		font-family: Helvetica;
		transition: all 0.5s cubic-bezier(0.07, 0.74, 0.03, 1.44);
	}
	.numShow {
		bottom: 52vh;
	}
	.text {
		font-size: 2rem;
		color: rgba(255, 255, 255, 0.65);
		position: absolute;
		bottom: -25vh;
		left: 50%;
		transform: translateX(-50%);
		transition: all 0.7s;
	}
	.textShow {
		bottom: 25vh;
	}
	.btn {
		position: absolute;
		bottom: -15vh;
		left: 50%;
		transform: translateX(-50%);
		transition: all 1s;
		.link {
			font-size: 0.6rem;
			color: #fff;
			padding: 0.3rem 0.6rem;
			background: rgba(0, 0, 0, 0.1);
			border: 1px solid #fff;
			.transi;
			&:hover {
				background: rgba(0, 0, 0, 0.3);
			}
		}
	}
	.btnShow {
		bottom: 15vh;
	}
}
</style>
