<template>
	<div id="crumb" data-step="3" data-intro="面包屑">
		<el-breadcrumb class="app-breadcrumb float-left" separator="/">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item,index)  in crumbList" :key="item.path" v-if="item.meta.title">
					<!-- <span v-if='item.redirect==="noredirect"||index==crumbList.length-1' class="no-redirect">{{item.meta.title}}</span> -->
					<router-link :to="item.path">{{item.meta.title}}</router-link>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: "crumb",
	created() {
		this.getBreadcrumb();
	},
	data() {
		return {
			crumbList: null
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		}
	},
	methods: {
		// 获取路由
		getBreadcrumb() {
			let matched = this.$route.matched;
			this.crumbList = matched;
		}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#crumb {
	width: 100%;
	height: 58px;
	background: #fff;
	// border-bottom: 1px solid @grey_border;
	&::before {
		content: "";
		display: block;
		width: 2px;
		height: 18px;
		background: @blue;
		float: left;
		margin-top: 20px;
	}
	.app-breadcrumb {
		line-height: 58px;
		margin-left: 8px;
	}
	/*breadcrumb transition*/
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.5s;
	}

	.breadcrumb-enter,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(20px);
	}

	.breadcrumb-move {
		transition: all 0.5s;
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
}
</style>
