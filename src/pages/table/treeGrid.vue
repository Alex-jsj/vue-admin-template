<template>
    <div id="treeGrid">
        <topTooltip>树形表格功能需要搭配后台接口使用，此处仅提供模拟</topTooltip>
        <TreeTable :table-data="tableData" :the-api="theApi"></TreeTable>
    </div>
</template>
<script>
// api
import * as theApi from "api/test/list";
import topTooltip from "components/topTooltip";
import TreeTable from "components/treeTable";
export default {
    name: "treeGrid",
    data() {
        return {
            tableData: [
                {
                    id: 3,
                    title: "一级分类",
                    children: [
                        {
                            id: 31,
                            title: "二级分类",
                            children: [
                                {
                                    id: 311,
                                    title: "三级分类"
                                },
                                {
                                    id: 312,
                                    title: "三级分类"
                                }
                            ]
                        },
                        {
                            id: 32,
                            title: "二级分类"
                        }
                    ]
                }
            ],
            theApi: theApi
        };
    },
    components: { TreeTable, topTooltip }
};
</script>
