<template>
    <div id="member_list">
        <!-- 表格 -->
        <baseTable
            :theApi="table_ajax"
            :table-config="configData.tableConfig"
            :top-btn-config="configData.topBtnConfig"
            :table-btn-config="configData.tableBtnConfig"
            :other-config="configData.otherConfig"
            :filter-config="configData.filterConfig"
            :grid-edit-width="200"
            form-title="会员"
            form-width="40%"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            @checkRegistration="checkRegistration"
            ref="basetable"
        ></baseTable>
    </div>
</template>
<script>
// api
import * as theApi from "api/test/list";
import baseTable from "components/baseTable";
// 类型验证
import { checkActivation, checkEntry } from "utils/checkTypes";
// 表单验证
import { checkUserName } from "utils/verify";
export default {
    name: "member_list",
    data() {
        return {
            //表格配置
            configData: {
                // 其他配置
                otherConfig: {
                    needSelect: true // 是否可以多选
                },
                // 表格数据配置
                tableConfig: [
                    { label: "ID", prop: "id", width: "70" },
                    { label: "用户名", prop: "username" },
                    { label: "昵称", prop: "nickname" },
                    { label: "注册时间", prop: "datetime", sortable: true },
                    {
                        label: "会员激活状态",
                        prop: "member_type",
                        render: (h, params) => {
                            const { color, text, icon } = checkActivation(
                                params.row.member_type
                            );
                            return (
                                <div class="icon-text">
                                    <i
                                        class={`iconfont icon-${icon}`}
                                        style={`color:${color}`}
                                    />
                                    <span style={`color:${color}`}>{text}</span>
                                </div>
                            );
                        }
                    },
                    {
                        label: "D20报名状态",
                        prop: "d20_type",
                        render: (h, params) => {
                            const { color, text, icon } = checkEntry(
                                params.row.d20_type
                            );
                            return (
                                <div class="icon-text">
                                    <i
                                        class={`iconfont icon-${icon}`}
                                        style={`color:${color}`}
                                    />
                                    <span style={`color:${color}`}>{text}</span>
                                </div>
                            );
                        }
                    },
                    {
                        label: "IDF创投报名状态",
                        prop: "idf_type",
                        render: (h, params) => {
                            const { color, text, icon } = checkEntry(
                                params.row.idf_type
                            );
                            return (
                                <div class="icon-text">
                                    <i
                                        class={`iconfont icon-${icon}`}
                                        style={`color:${color}`}
                                    />
                                    <span style={`color:${color}`}>{text}</span>
                                </div>
                            );
                        }
                    }
                ],
                // 表格内按钮配置
                tableBtnConfig: {
                    width: 245, //宽度
                    update: true, // 编辑
                    delete: true, // 删除
                    expands: [
                        {
                            name: "查看报名",
                            emitName: "checkRegistration",
                            type: "primary"
                        }
                    ]
                },
                // 表格上方按钮配置
                topBtnConfig: [
                    {
                        title: "添加会员",
                        icon: "el-icon-circle-plus"
                    }
                ],
                // 筛选组件配置
                filterConfig: {
                    filter_list: ["search", "registerYear", "activation"],
                    search_list: ["用户名", "昵称"]
                },
                // table的模态框表单配置，可配置表单类型，验证规则，是否必填,col-span布局可通过span参数配置
                formConfig: [
                    {
                        span: 24,
                        label: "用户名",
                        prop: "username",
                        type: "text",
                        rules: {
                            required: true,
                            validator: checkUserName,
                            trigger: "blur"
                        }
                    },
                    {
                        span: 24,
                        label: "昵称",
                        prop: "nickname",
                        type: "text",
                        rules: {
                            required: true,
                            message: "请输入昵称",
                            trigger: "blur"
                        }
                    },
                    {
                        span: 24,
                        label: "密码",
                        prop: "password",
                        type: "password",
                        rules: {
                            required: true,
                            validator: (rule, value, callback) => {
                                const is_edit = this.$refs.basetable.$refs
                                    .dialogForm.isEdit; // 判断当前是编辑还是新增
                                const reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
                                if (!value) {
                                    if (!is_edit) {
                                        callback(new Error("密码不能为空"));
                                    } else {
                                        callback(); //可为空
                                    }
                                } else if (reg.test(value) == false) {
                                    callback(
                                        new Error(
                                            "密码必须为6~15位，英文与数字或下划线组合"
                                        )
                                    );
                                } else {
                                    callback();
                                }
                            },
                            trigger: "blur"
                        }
                    },
                    {
                        span: 24,
                        label: "确认密码",
                        prop: "checkpassword",
                        type: "password",
                        rules: {
                            required: true,
                            validator: (rule, value, callback) => {
                                const psd = this.$refs.basetable.$refs
                                    .dialogForm.formModel.password; // 输入的密码
                                const is_edit = this.$refs.basetable.$refs
                                    .dialogForm.isEdit; // 判断当前是编辑还是新增
                                const reg = /^[0-9a-zA-Z_]{6,15}$/; //6-15位数字字母下划线
                                if (!value) {
                                    if (!is_edit) {
                                        callback(new Error("密码不能为空"));
                                    } else {
                                        callback(); //可为空
                                    }
                                } else if (reg.test(value) == false) {
                                    callback(
                                        new Error(
                                            "密码必须为6~15位，英文与数字或下划线组合"
                                        )
                                    );
                                } else if (value !== psd) {
                                    callback(new Error("两次输入密码不一致!"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: "blur"
                        }
                    }
                ],
                // 表单基础数据类型，需要预先赋值
                formModel: {
                    username: "",
                    nickname: "",
                    password: "",
                    checkpassword: ""
                }
            },
            // ajax
            table_ajax: theApi
        };
    },
    components: { baseTable },
    methods: {
        checkRegistration: function(row = {}) {
            this.$router.push({
                path: "/pages/index/enroll/entry/list",
                query: { id: row.id }
            });
        }
    }
};
</script>
