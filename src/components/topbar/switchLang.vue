<template>
	<div id="switchLang">
		<el-dropdown trigger="click" class="international" @command="checkLang" size="medium">
			<div>
				<i class="iconfont icon-yuyan" data-step="1" :data-intro="$t('introductorPage.step1')"></i>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
				<el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: "switchLang",
	data() {
		return {};
	},
	computed: {
		language() {
			return this.$store.state.language;
		}
	},
	methods: {
		// 切换语言
		checkLang: function(lang) {
			this.$i18n.locale = lang;
			this.$store.commit("SET_LANGUAGE", lang); // 存入vuex
			this.$message({
				message: lang == "zh" ? "切换为中文" : "Switch To English",
				type: "success"
			});
		}
	}
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#switchLang {
	display: table;
	height: 60px;
	margin-right: 20px;
	.international {
		display: table-cell;
		vertical-align: middle;
	}
	.iconfont {
		color: #fff;
		font-size: 24px;
		display: block;
		cursor: pointer;
		&:hover {
			color: @grey;
			.transi;
		}
	}
}
</style>
