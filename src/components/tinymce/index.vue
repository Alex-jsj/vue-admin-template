<template>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
        <textarea :id="tinymceId" class="tinymce-textarea"/>
        <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
        </div>
    </div>
</template>

<script>
import editorImage from "./component/imgUpload";
import plugin from "./plugin";
import toolbar from "./toolbar";
export default {
    name: "Tinymce",
    components: { editorImage },
    props: {
        id: {
            type: String,
            default: function() {
                return (
                    "vue-tinymce-" +
                    +new Date() +
                    ((Math.random() * 1000).toFixed(0) + "")
                );
            }
        },
        value: {
            type: String,
            default: ""
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return [];
            }
        },
        menubar: {
            type: String,
            default: "file edit insert view format table"
        },
        height: {
            type: Number,
            required: false,
            default: 360
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
            languageTypeList: {
                en: "en",
                zh: "zh_CN"
            }
        };
    },
    computed: {
        language() {
            return this.languageTypeList[this.$store.state.language];
        }
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() =>
                    window.tinymce.get(this.tinymceId).setContent(val || "")
                );
            }
        },
        language() {
            this.destroyTinymce();
            this.$nextTick(() => this.initTinymce());
        }
    },
    mounted() {
        this.$nextTick(() => this.initTinymce());
    },
    activated() {
        this.$nextTick(() => this.initTinymce());
    },
    deactivated() {
        this.destroyTinymce();
    },
    destroyed() {
        this.destroyTinymce();
    },
    methods: {
        // 初始化
        initTinymce() {
            const _this = this;
            window.tinymce.init({
                language: this.language,
                selector: `#${this.tinymceId}`,
                height: this.height,
                body_class: "panel-body ",
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: this.menubar,
                plugins: plugin,
                end_container_on_empty_block: true,
                powerpaste_word_import: "clean",
                code_dialog_height: 450,
                code_dialog_width: 1000,
                // advlist_bullet_styles: "square",
                // advlist_number_styles: "default",
                imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
                default_link_target: "_blank",
                relative_urls: false,
                link_title: false,
                autosave_interval: "5s", // 5s自动保存一次草稿
                autosave_restore_when_empty: true,
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                formats: {
                    tindent_format: {
                        selector: "p",
                        styles: { "text-indent": "2em" }
                    }
                },
                init_instance_callback: editor => {
                    if (_this.value) {
                        editor.setContent(_this.value);
                    }
                    _this.hasInit = true;
                    editor.on("NodeChange Change KeyUp SetContent", () => {
                        this.hasChange = true;
                        this.$emit("input", editor.getContent());
                    });
                },
                setup(editor) {
                    editor.on("FullscreenStateChanged", e => {
                        _this.fullscreen = e.state;
                    });
                    editor.addButton("tindent_bttn", {
                        text: "首行缩进",
                        tooltip: "首行缩进",
                        onclick: function() {
                            editor.execCommand(
                                "mceToggleFormat",
                                false,
                                "tindent_format"
                            );
                        }
                    });
                }
                // 整合七牛上传
                // images_dataimg_filter(img) {
                //   setTimeout(() => {
                //     const $image = $(img);
                //     $image.removeAttr('width');
                //     $image.removeAttr('height');
                //     if ($image[0].height && $image[0].width) {
                //       $image.attr('data-wscntype', 'image');
                //       $image.attr('data-wscnh', $image[0].height);
                //       $image.attr('data-wscnw', $image[0].width);
                //       $image.addClass('wscnph');
                //     }
                //   }, 0);
                //   return img
                // },
                // images_upload_handler(blobInfo, success, failure, progress) {
                //   progress(0);
                //   const token = _this.$store.getters.token;
                //   getToken(token).then(response => {
                //     const url = response.data.qiniu_url;
                //     const formData = new FormData();
                //     formData.append('token', response.data.qiniu_token);
                //     formData.append('key', response.data.qiniu_key);
                //     formData.append('file', blobInfo.blob(), url);
                //     upload(formData).then(() => {
                //       success(url);
                //       progress(100);
                //     })
                //   }).catch(err => {
                //     failure('出现未知问题，刷新页面，或者联系程序员')
                //     console.log(err);
                //   });
                // },
            });
        },
        // 销毁
        destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId);
            if (this.fullscreen) {
                tinymce.execCommand("mceFullScreen");
            }
            if (tinymce) {
                tinymce.destroy();
            }
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
        },
        getContent() {
            window.tinymce.get(this.tinymceId).getContent();
        },
        imageSuccessCBK(arr) {
            const _this = this;
            arr.forEach(v => {
                window.tinymce
                    .get(_this.tinymceId)
                    .insertContent(`<img class="wscnph" src="${v.url}" >`);
            });
        }
    }
};
</script>

<style scoped>
.tinymce-container {
    position: relative;
    line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
}
.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}
.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}
.editor-upload-btn {
    display: inline-block;
}
</style>