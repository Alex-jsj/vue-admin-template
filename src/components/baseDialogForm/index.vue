<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width?width:'80%'">
        <el-form :model="formModel" ref="configForm" label-width="100px">
            <el-row :gutter="16">
                <el-col :span="item.span?item.span:8" v-for="(item,index) in config" :key="index">
                    <el-form-item :prop="item.prop" :rules="item.rules" :label="item.label">
                        <!--输入框表单类型-->
                        <el-input
                            v-if="item.type === 'text' || item.type === 'password' || item.type === 'textarea'"
                            :type="item.type"
                            v-model="formModel[item.prop]"
                            :placeholder="item.placeholder?item.placeholder:'请输入'"
                        ></el-input>
                        <!-- 计数器 -->
                        <el-input-number v-if="item.type === 'el-input-number'" v-model="formModel[item.prop]" :min="1" :step="1" label="描述文字"></el-input-number>
                        <!--checkbox表单类型-->
                        <el-checkbox-group v-if="item.type === 'checkbox'" v-model="formModel[item.prop]" :placeholder="item.placeholder?item.placeholder:'请选择'">
                            <el-checkbox v-for="option in item.data" :label="option.id" :key="option.id">{{option.name}}</el-checkbox>
                        </el-checkbox-group>
                        <!--radio表单类型-->
                        <el-radio-group v-if="item.type === 'radio'" v-model="formModel[item.prop]" :placeholder="item.placeholder?item.placeholder:'请选择'">
                            <el-radio v-for="option in item.data" :label="option.id" :key="option.id">{{option.name}}</el-radio>
                        </el-radio-group>
                        <!--下拉选择类型-->
                        <el-select v-if="item.type === 'select'" v-model="formModel[item.prop]" :placeholder="item.placeholder?item.placeholder:'请选择'">
                            <el-option v-for="option in item.data" :key="option.id" :label="option.label" :value="option.id"></el-option>
                        </el-select>
                        <el-date-picker
                            v-if="item.type === 'datepicker'"
                            v-model="formModel[item.prop]"
                            type="date"
                            :placeholder="item.placeholder?item.placeholder:'请选择日期'"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(formModel)">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "base-dialog-form",
    props: [
        "title",
        "width",
        "visible",
        "config",
        "formData",
        "errForm",
        "isEdit"
    ],
    data() {
        return {
            formModel: {},
            dialogVisible: false,
            dialogTitle: ""
        };
    },
    mounted() {
        // 将组件上的属性赋值给当前组件内变量，因为props只能单向绑定,还需要监听属性值变化进行父子组件间交互
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.dialogVisible = this.visible;
        this.dialogTitle = this.title;
    },
    methods: {
        // 提交表单数据
        submitForm(obj) {
            this.$refs.configForm.validate(valid => {
                if (valid) {
                    // 让父组件接收到响应数据
                    this.$emit("submit", this.formModel);
                    // 关闭模态框
                    this.dialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        // 展示模态框
        showDialog() {
            this.dialogVisible = true;
        }
    },
    watch: {
        /*实现表单数据的绑定，实时接收父组件的数据变化*/
        formData() {
            this.formModel = JSON.parse(JSON.stringify(this.formData));
        },
        dialogVisible(newValue) {
            if (newValue === false) {
                this.$emit("resetFormModel"); // 重置父组件的表单模型，防止新增的时候由于watch formData导致新增时也被填入数据
                this.$refs.configForm.clearValidate(); // 移除表单校验
            }
        }
    }
};
</script>

<style lang="less" scoped>
.el-input {
    width: 100% !important;
}

.el-select {
    width: 100% !important;
}
</style>