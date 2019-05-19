<template>
    <div id="myTable">
        <filterGroup :filterList="filterConfig.filter_list" :search_list="filterConfig.search_list" v-on="{getFilterData:filterData}"></filterGroup>
        <div class="piliang">
            <router-link class="btn-link" v-for="item in topBtnConfig" :key="item.title" :to="item.jumpPage?item.jumpAddress:''">
                <el-button type="primary" :icon="item.icon" v-if="item.jumpPage">{{item.title}}</el-button>
                <el-button type="primary" :icon="item.icon" @click="createOrUpdate()" v-else>{{item.title}}</el-button>
            </router-link>
            <!-- 自定义显示 -->
            <customDisplay :customDisplayList="customDisplayList" v-on="{update_custom_display:updateCustomDisplay}"></customDisplay>
            <el-button class="float-right" @click="getData(true)" icon="el-icon-refresh" :loading="loading">更新数据</el-button>
        </div>
        <!--主体内容区，展示表格内容-->
        <el-table
            class="baseTable"
            :data="tableData"
            border
            size="small"
            v-loading="loading"
            tooltip-effect="dark"
            ref="table"
            @current-change="_handleCurrentChange"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" v-if="otherConfig.needSelect"></el-table-column>
            <el-table-column
                v-for="(item,index) in tableConfig"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width?item.width:''"
                :min-width="item.minWidth?item.minWidth:''"
                :sortable="item.sortable?true:false"
                v-if="customDisplayList[index].show"
            >
                <template slot-scope="scope">
                    <Cell v-if="item.render" :row="scope.row" :column="item" :index="scope.$index" :render="item.render"></Cell>
                    <span v-else>{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="tableBtnConfig.width" :width="tableBtnConfig.width" fixed="right" class-name="btns">
                <template slot-scope="scope">
                    <!--扩展按钮-->
                    <el-button
                        @click="handleEmit(item.emitName, scope.row, scope.$index)"
                        v-if="tableBtnConfig.expands && tableBtnConfig.expands.length>0"
                        v-for="(item,index) in tableBtnConfig.expands"
                        :key="index"
                        :type="item.type?item.type:'primary'"
                    >{{item.name}}</el-button>
                    <el-button type="warning" v-if="tableBtnConfig.update&&!tableBtnConfig.isUpdateInNewPage" @click="createOrUpdate(scope.row)">编辑</el-button>
                    <el-button
                        type="warning"
                        v-else-if="tableBtnConfig.update&&tableBtnConfig.isUpdateInNewPage"
                        @click="goTo(scope.row.id,tableBtnConfig.updateAddress)"
                    >编辑</el-button>
                    <el-button type="danger" v-if="tableBtnConfig.delete" @click.native="deleteItem(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 表格操作按钮 -->
        <div class="table-control-box">
            <el-button v-if="otherConfig.needSelect" type="info" @click="toggleSelection(tableData)">全选</el-button>
            <el-button v-if="otherConfig.needSelect" type="info" @click="batchDelete()">批量删除</el-button>
            <pagination class="float-right" :currentPaging="currentPaging" v-on="{sizeChange:handleSizeChange,currentChange:handleCurrentChange}"></pagination>
        </div>
        <!--按钮触发的表单弹窗-->
        <BaseDialogForm
            :title="dialogTitle"
            :width="formWidth"
            ref="dialogForm"
            :config="formConfig"
            :form-data="formModel"
            :err-form="formError"
            :is-edit="isEdit"
            @submit="dialogSubmit"
            @resetFormModel="_initFormModel"
        ></BaseDialogForm>
    </div>
</template>

<script>
import Cell from "./expand";
import BaseDialogForm from "components/baseDialogForm";
import customDisplay from "./customDisplay";
// 分页
import pagination from "components/pagination";
import filterGroup from "components/filterGroup";

export default {
    name: "baseTable",
    components: {
        Cell,
        BaseDialogForm,
        pagination,
        filterGroup,
        customDisplay
    },
    props: [
        // 表格配置
        "tableConfig",
        // 表格按钮配置
        "tableBtnConfig",
        // 数据接口
        "theApi",
        // 其他表格配置
        "otherConfig",
        // 上方按钮配置
        "topBtnConfig",
        // 筛选项配置
        "filterConfig",
        // 表单标题，例如用户、角色
        "formTitle",
        "formWidth",
        // 表单配置
        "formConfig",
        //  表格编辑区域宽度
        "gridEditWidth",
        // 表单的model数据
        "formDataModel"
    ],
    data() {
        return {
            //  表格加载状态
            loading: false,
            // 表格展示数据
            tableData: [],
            multipleSelection: [],
            // 全选数据容器
            allSelect: false,
            // 筛选项
            filter_data: {},
            // 分页
            currentPaging: { currentPage: 1, pageSize: 10, totals: 0 },
            // 新增修改模态框title
            dialogTitle: "",
            // 表单数据
            initFormModel: {},
            // 后台输出错误信息
            formError: {},
            // 是否是编辑
            isEdit: false,
            // 自定义显示数据
            customDisplayList: []
        };
    },
    computed: {
        formModel: {
            get: function() {
                return this.initFormModel;
            },
            set: function(newValue, oldValue) {
                this.initFormModel = newValue;
            }
        }
    },
    created() {
        this._initFormModel(); // 初始化表单数据模型
        this.getData();
        this.customInit(this.tableConfig);
    },
    methods: {
        // 根据表格配置生成自定义显示数组
        customInit: function(arr = []) {
            this.customDisplayList = arr.map(item => {
                return {
                    show: true,
                    label: item.label
                };
            });
        },
        // 获取列表数据
        getData: async function(update = false) {
            this.loading = true;
            // 默认数据
            let default_data = {
                page: this.currentPaging.currentPage,
                per_page: this.currentPaging.pageSize
            };
            if (this.otherConfig.isUid) {
                default_data = Object.assign(default_data, {
                    uid: this.otherConfig.isUid
                });
            }
            // 筛选数据
            let data = Object.assign(default_data, this.filter_data);
            try {
                const res = await this.theApi.getData(data);
                this.loading = false;
                if (res.code === 200) {
                    update && this.$message.success("数据已更新");
                    const respon = res || {};
                    this.tableData = respon.data || []; // 给表格赋值
                    respon.total && (this.currentPaging.totals = respon.total);
                }
            } catch (err) {
                this.loading = false;
            }
        },
        // 新增 编辑按钮
        createOrUpdate(item) {
            if (item) {
                this.getEditData(item.id, () => {
                    this.$refs.dialogForm.showDialog();
                    this.isEdit = true;
                });
            } else {
                this.$refs.dialogForm.showDialog();
                this.isEdit = false;
            }
            this.dialogTitle = (item ? "编辑" : "添加") + this.formTitle;
        },
        // 从后台获取编辑框需要的数据，表格只用作展示作用，所以不从表格内获取数据
        getEditData: async function(id, callback) {
            const res = await this.theApi.getEdit(id);
            if (res.code === 200) {
                const respon = res.data || {};
                this.formModel = Object.assign({}, respon.data || {});
                callback && callback();
            }
        },
        // 初始化表单模型
        _initFormModel: function() {
            if (this.formDataModel) {
                const data = JSON.parse(JSON.stringify(this.formDataModel));
                this.formModel = data;
            }
        },
        // 模态框数据提交
        dialogSubmit: async function(data) {
            // 根据是否有id判断是新增还是编辑
            const res = await this.theApi[data.id ? "editItem" : "addItem"](
                data
            );
            if (res.code === 200) {
                this.getData();
                this.$message.success(this.dialogTitle + "成功！");
            } else {
                // 在表单中输出错误提示
                const errList = res.errors || "";
                if (errList) {
                    for (let key in errList) {
                        errList[key] = errList[key][0];
                    }
                    this.formError = errList;
                }
            }
        },
        // 处理相应父组件的事件方法
        handleEmit(emitName, row, idx) {
            this.$emit(emitName, row, idx);
        },
        // 编辑跳转页面
        goTo: function(id, url) {
            this.$router.push({
                path: url,
                query: { id: id }
            });
        },
        // 删除
        deleteItem: function(id) {
            this.$confirm("是否删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    //ajax
                    this.theApi.deleteItem({ id: id }).then(() => {
                        if (res.code === 200) {
                            this.$message.success("删除成功");
                            // 刷新数据
                            this.getData();
                        }
                    });
                })
                .catch(() => {
                    this.$message.info("取消删除");
                });
        },
        // 批量删除
        batchDelete: function() {
            if (this.multipleSelection[0]) {
                this.$confirm("是否删除选择的条目?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let data = this.multipleSelection;
                        //ajax
                    })
                    .catch(() => {
                        this.$message.info("取消删除");
                    });
            } else {
                this.$message.error("请先选择要删除的条目");
            }
        },
        // 表格选择
        handleSelectionChange: function(val) {
            this.multipleSelection = val;
            this.allSelect = val.length === this.tableData.length;
        },
        // 表格单选
        _handleCurrentChange(val) {
            this.otherConfig.needSingelClick
                ? this.$emit(this.otherConfig.singelClickName, val)
                : "";
        },
        // 全选按钮
        toggleSelection: function(rows) {
            if (rows && !this.allSelect) {
                rows.forEach(row => {
                    this.$refs.table.toggleRowSelection(row, true);
                });
            } else {
                this.$refs.table.clearSelection();
            }
        },
        // 分页sizeChange
        handleSizeChange: function(val) {
            this.currentPaging.pageSize = val;
            this.currentPaging.currentPage = 1;
            // 更新数据
            this.getData();
        },
        // 分页currentChange
        handleCurrentChange: function(val) {
            this.currentPaging.currentPage = val;
            // 更新数据
            this.getData();
        },
        // 更新自定义显示组件数据
        updateCustomDisplay: function(arr) {
            this.customDisplayList = arr;
        },
        // 筛选
        filterData: function(obj) {
            let _field = [];
            if (this.filterConfig.search_field) {
                _field = JSON.parse(
                    JSON.stringify(this.filterConfig.search_field)
                );
            }
            this.tableData = []; // 清空表格数据
            this.filter_data = JSON.parse(JSON.stringify(obj)); // 筛选组件过来的数据
            this.currentPaging.currentPage = 1;
            // 替换字段
            _field.forEach(item => {
                if (this.filter_data.hasOwnProperty(item[0])) {
                    this.filter_data[item[1]] = this.filter_data[item[0]];
                    delete this.filter_data[item[0]];
                }
            });
            // 刷新数据
            this.getData();
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
.baseTable {
    width: 100%;
    margin: 0.55rem 0;
    /* 强制不换行 */
    .btns {
        .cell {
            white-space: nowrap;
        }
    }
    /deep/ thead {
        th {
            background: lighten(#ebeef5, 3%);
            color: #333;
            font-size: 14px;
        }
    }
    .icon-text {
        .iconfont {
            font-size: 14px;
            margin-right: 5px;
        }
    }
}
.table-control-box {
    overflow: hidden;
}
.piliang {
    margin: 0.55rem 0;
    position: relative;
    &::after {
        .clear;
    }
    .btn-link {
        margin-right: 10px;
        float: left;
    }
    .el-button {
        margin-left: 0;
    }
}
</style>