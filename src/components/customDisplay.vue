<template>
  <div id="customDisplay" class="float-left">
    <el-button type=""  class="float-left" icon="el-icon-setting" @click="customDisplayShow = !customDisplayShow">自定义显示</el-button>
    <div class="custom-display-dialog float-left" v-if="customDisplayShow">
      <ul class="custom-display-dialog-list">
        <li class="item title">当前展示的信息</li>
        <li class="item">
          <el-checkbox v-model="checkedAll" @change="selectAll">全选</el-checkbox>
        </li>
        <li class="item" v-for="(item,index) in list" :key="index">
          <el-checkbox v-model="item.checked" @change="select">{{item.label}}</el-checkbox>
        </li>
      </ul>
      <!-- model -->
      <div class="model" @click="customDisplayShow = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customDisplay",
  data() {
    return {
      customDisplayShow: false,
      checkedAll: true,
      list: []
    };
  },
  props: {
    customDisplayList: {}
  },
  created: function() {
    this.list = JSON.parse(JSON.stringify(this.customDisplayList));
  },
  methods: {
    selectAll: function() {
      this.list.map(item => {
        item.checked = this.checkedAll;
      });
      this.$emit("update_custom_display", this.list);
    },
    select: function() {
      let _list = this.list;
      for (let i = 0; i < _list.length; i++) {
        if (!_list[i].checked) {
          this.checkedAll = false;
          break;
        } else {
          this.checkedAll = true;
        }
      }
      this.$emit("update_custom_display", this.list);
    }
  }
};
</script>
<style lang="less">
@import "~assets/css/mixin.less";
#customDisplay {
  margin-right: 10px;
  .custom-display-dialog {
    margin-left: 10px;
    position: relative;
    z-index: 2200;
    .custom-display-dialog-list {
      position: absolute;
      z-index: 998;
      padding: 10px 20px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
      .item {
        margin: 2px 0;
        .el-checkbox {
          display: block;
        }
      }
      .title {
        font-size: 16px;
        white-space: nowrap;
        margin-bottom: 10px;
        color: #888;
        padding-right: 5px;
      }
    }
    .model {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 997;
    }
  }
}
</style>
