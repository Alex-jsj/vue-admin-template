<template>
	<div id="editor">
		<topTooltip>{{$t('editor.toolTip')}}</topTooltip>
		<tinymceEditor></tinymceEditor>
	</div>
</template>
<script>
import topTooltip from "components/topTooltip";
import tinymceEditor from "components/tinymce"; // 富文本编辑器
export default {
	// 富文本编辑器
	name: "editor",
	data() {
		return {};
	},
	components: { tinymceEditor, topTooltip }
};
</script>

<style scoped lang="less">
@import "~assets/css/mixin.less";

#editor {
	width: 100%;
}
</style>
