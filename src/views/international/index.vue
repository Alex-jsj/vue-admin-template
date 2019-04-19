<template>
    <div>
        <topTooltip>{{$t('international.tooltip')}}</topTooltip>
        <el-button type="primary" @click="switchLang('zh')">中文</el-button>
        <el-button type="warning" @click="switchLang('en')">English</el-button>
    </div>
</template>
<script>
// 组件
import topTooltip from "components/topTooltip";
export default {
    name: "international",
    components: { topTooltip },
    methods: {
        switchLang: function(lang) {
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
