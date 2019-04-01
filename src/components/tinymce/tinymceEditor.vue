<template>
	<div class="tinymce">
		<editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
		<el-button class="upload"  type="primary" icon="el-icon-upload2">上传附件</el-button>
		<div class="html-content" v-html="tinymceHtml"></div>
	</div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
	name: "tinymce",
	data() {
		return {
			tinymceHtml: "<h1 style=\"box-sizing: inherit; margin: 0.67em 0px; font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; text-align: center;\">Welcome to the TinyMCE demo!</h1>\n<p style=\"box-sizing: inherit; font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; text-align: center; font-size: 15px;\"><img style=\"box-sizing: inherit; border-style: none;\" title=\"TinyMCE Logo\" src=\"https://www.tinymce.com/images/glyph-tinymce@2x.png\" alt=\"TinyMCE Logo\" width=\"110\" height=\"97\" /></p>\n<ul style=\"box-sizing: inherit; font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; font-size: medium;\">\n<li style=\"box-sizing: inherit;\">Our&nbsp;<a style=\"box-sizing: inherit; background-color: transparent; cursor: pointer; text-decoration-line: none;\" href=\"https://www.tinymce.com/docs/\">documentation</a>&nbsp;is a great resource for learning how to configure TinyMCE.</li>\n<li style=\"box-sizing: inherit;\">Have a specific question? Visit the&nbsp;<a style=\"box-sizing: inherit; background-color: transparent; cursor: pointer; text-decoration-line: none;\" href=\"https://community.tinymce.com/forum/\">Community Forum</a>.</li>\n<li style=\"box-sizing: inherit;\">We also offer enterprise grade support as part of&nbsp;<a style=\"box-sizing: inherit; background-color: transparent; cursor: pointer; text-decoration-line: none;\" href=\"https://tinymce.com/pricing\">TinyMCE premium subscriptions</a>.</li>\n</ul>",
			init: {
				language_url: "/static/tinymce/zh_CN.js",
				language: "zh_CN",
				skin_url: "/static/tinymce/skins/lightgray",
				height: 300,
				plugins:
					"link lists image code table colorpicker textcolor wordcount contextmenu",
				toolbar:
					"bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
				branding: false
			}
		};
	},
	mounted() {
		tinymce.init({});
	},
	components: { Editor },
	methods: {
		returnHtme: function() {
			// console.log(this.tinymceHtml);
		}
	}
};
</script>

<style lang="less">
.tinymce {
	position: relative;
	.upload {
		position: absolute;
		top: 4px;
		right: 2px;
	}
	.html-content {
		width: 100%;
		margin-top: 50px;
	}
}
</style>