<template>
	<div id="logo">
		<router-link to="/views/index" class="link">
			<img :src="logoSrc" alt="logo" class="logo-img">
			<!-- text -->
			<span class="logo-text">{{$t('base.websiteTitle')}}</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "logo",
	data() {
		return { logoSrc: "./static/img/vue.png" };
	},
	computed: {},
	methods: {}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#logo {
	height: 100%;
	.link {
		width: 100%;
		height: 60px;
		display: table-cell;
		vertical-align: middle;
	}
	.logo-img {
		vertical-align: middle;
		width: 50px;
		line-height: 60px;
	}
	.logo-text {
		font-size: 22px;
		color: #fff;
		letter-spacing: 3px;
		vertical-align: middle;
	}
}
</style>
