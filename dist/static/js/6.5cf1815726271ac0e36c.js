webpackJsonp([6],{BCvg:function(t,e){},NF8Y:function(t,e){},Nn1j:function(t,e,i){"use strict";var a=i("mvHQ"),r=i.n(a),n=i("Xxa5"),l=i.n(n),o=i("woOf"),s=i.n(o),c=i("exGp"),f=i.n(c),u={name:"TableExpand",functional:!0,props:{row:Object,render:Function,index:Number,column:{type:Object,default:null}},render:function(t,e){var i={row:e.props.row,index:e.props.index};return e.props.column&&(i.column=e.props.column),e.props.render(t,i)}},p={name:"base-dialog-form",props:["title","width","visible","config","formData","errForm"],data:function(){return{formModel:{},dialogVisible:!1,dialogTitle:""}},mounted:function(){this.formModel=this.formData,this.dialogVisible=this.visible,this.dialogTitle=this.title},methods:{submitForm:function(){var t=this;this.$refs.configForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$emit("submit",t.formModel),t.dialogVisible=!1})},resetForm:function(){this.$refs.configForm&&this.$refs.configForm.resetFields()},showDialog:function(){this.dialogVisible=!0}},watch:{formData:function(){this.formModel=this.formData}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:t.title,visible:t.dialogVisible,width:t.width?t.width:"80%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"configForm",attrs:{model:t.formModel,"label-width":"100px"}},[i("el-row",{attrs:{gutter:16}},t._l(t.config,function(e,a){return i("el-col",{key:a,attrs:{span:e.span?e.span:8}},[i("el-form-item",{attrs:{prop:e.prop,rules:e.rules,label:e.label}},["text"===e.type?i("el-input",{attrs:{placeholder:e.placeholder?e.placeholder:"请输入"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}}):t._e(),t._v(" "),"textarea"===e.type?i("el-input",{attrs:{type:"textarea",placeholder:e.placeholder?e.placeholder:"请输入"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}}):t._e(),t._v(" "),"el-input-number"===e.type?i("el-input-number",{attrs:{min:1,step:1,label:"描述文字"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}}):t._e(),t._v(" "),"checkbox"===e.type?i("el-checkbox-group",{attrs:{placeholder:e.placeholder?e.placeholder:"请选择"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}},t._l(e.data,function(e){return i("el-checkbox",{key:e.id,attrs:{label:e.id}},[t._v(t._s(e.name))])})):t._e(),t._v(" "),"radio"===e.type?i("el-radio-group",{attrs:{placeholder:e.placeholder?e.placeholder:"请选择"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}},t._l(e.data,function(e){return i("el-radio",{key:e.id,attrs:{label:e.id}},[t._v(t._s(e.name))])})):t._e(),t._v(" "),"select"===e.type?i("el-select",{attrs:{placeholder:e.placeholder?e.placeholder:"请选择"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}},t._l(e.data,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.id}})})):t._e(),t._v(" "),"datepicker"===e.type?i("el-date-picker",{attrs:{type:"date",placeholder:e.placeholder?e.placeholder:"请选择日期"},model:{value:t.formData[e.prop],callback:function(i){t.$set(t.formData,e.prop,i)},expression:"formData[item.prop]"}}):t._e()],1)],1)}))],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("确 定")])],1)],1)},staticRenderFns:[]};var h=i("VU/8")(p,d,!1,function(t){i("BCvg")},"data-v-7501a482",null).exports,m=i("spLH"),g=i("d7EF"),_=i.n(g),v=(i("NF8Y"),{name:"filterGroup",data:function(){return{district_text:"",menuType:1,contentWidthType:"Flow",isCollapse:!1,open:!1,btn_text:"展开",open_btn_show:!1,isCbjg:!1,filterOptions:{search:!1,date_scope:!1,select_2:!1,cities:!1,pay:!1,zhifufangshi:!1,guoji:!1,minzu:!1},filterData:{},filter_arr:[],select_2:[],zhifufangshi:[{title:"支付宝",id:1},{title:"微信",id:10},{title:"银联(个人网银)",id:20},{title:"银联(企业网银)",id:21}],zfzt:[{title:"已支付",id:1},{title:"未支付",id:0}],shijian:[{title:"修改",id:0},{title:"删除",id:1},{title:"新增",id:2}]}},props:{filterList:Array,search_list:Array,sure:!0,showClearAllBtn:!0,canClearFilter:!0},watch:{listenContentWidthType:function(t){this.contentWidthType=t,this.showBtn()},listenMenuType:function(t){this.menuType=t,this.showBtn()},listenMenuCollapse:function(t){this.isCollapse=t,this.showBtn()}},computed:{listenContentWidthType:function(){return this.$store.state.contentWidthType},listenMenuType:function(){return this.$store.state.menuType},listenMenuCollapse:function(){return this.$store.state.menuCollapse},cities:function(){return this.$store.state.filterInfo.cities},guoji:function(){return this.$store.state.filterInfo.country},minzu:function(){return this.$store.state.filterInfo.nation},role:function(){return this.$store.state.role}},created:function(){for(var t in this.filterOptions)for(var e in this.filterList)this.filterList[e]==t&&(this.filterOptions[t]=!0);this.filterOptions.select_2&&this.getSelect_2()},mounted:function(){var t=this;t.showBtn(function(){"1"===t.$route.query.show_filter&&(t.open_btn_show&&(t.open=!0,t.btn_text="收起"),t.filterData={},t.$emit("getFilterData",t.filterData),t.initFilter(t.filterData))})},methods:{showBtn:function(t){var e=this;setTimeout(function(){var i=document.getElementById("formBox");e.open_btn_show=i.clientHeight>50,t&&t()},310)},districtChange:function(t){var e=JSON.parse(r()(t));this.filterData.district_id=e.pop()},show_district_text:function(){var t=document.querySelector(".district_text .el-input__inner");this.district_text=t.getAttribute("value")},getSelect_2:function(){var t=this;get_select_2({}).then(function(e){200===e.code&&(t.select_2=e.data||[])})},getFilterData:function(){var t=this.filterData;for(var e in t)if(""===t[e]||null===t[e])delete t[e];else if("date_scope"===e){var i=_()(t[e],2),a=i[0],r=i[1];s()(t,{exam_start_time:a},{exam_end_time:r})}this.$emit("getFilterData",t),this.filterOptions.cities&&this.show_district_text(),this.initFilter(t)},initFilter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=[];for(var i in t)""!==t[i]&&void 0!==t[i]&&null!==t[i]&&e.push({key:i,title:this.filterMap(i,t[i]).title,value:this.filterMap(i,t[i]).value});this.filter_arr=e},filterMap:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments[1],i={};switch(t){case"keyword":i.title="关键字",i.value=e;break;case"district_id":i.title="区域",i.value=this.district_text;break;case"country_id":i.title="国籍",i.value=this.arrayMapFilter(this.guoji,e).title;break;case"nation_id":i.title="民族",i.value=this.arrayMapFilter(this.minzu,e).title;break;case"role":i.title="用户组",i.value=this.arrayMapFilter(this.select_2,e).title;break;case"payment_state":i.title="支付状态",i.value=this.arrayMapFilter(this.zfzt,e).title;break;case"pay_plat":i.title="支付方式",i.value=this.arrayMapFilter(this.zhifufangshi,e).title;break;case"shijian":i.title="事件",i.value=this.arrayMapFilter(this.shijian,e).title;break;case"date_scope":i.title="日期",i.value=e[0]+" - "+e[1];break;default:i={}}return i},arrayMapFilter:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments[1];return JSON.parse(r()(t)).filter(function(t){t.id==e&&(e=t)}),e},closeTag:function(t){var e=t.key;if("district_id"==t.key){var i={stopPropagation:function(){}};this.$refs.district_dom.clearValue(i),delete this.filterData[e]}else delete this.filterData[e];this.getFilterData()},closeAllTag:function(){if(this.filterData={},this.$refs.district_dom){var t={stopPropagation:function(){}};this.$refs.district_dom.clearValue(t)}this.getFilterData()}}}),b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"filterGroup"}},[i("div",{staticClass:"filter-container",class:{opened:t.open,big:t.open_btn_show}},[i("el-form",{ref:"filterForm",attrs:{inline:!0,id:"formBox"}},[t.filterOptions.search?i("el-form-item",{attrs:{label:"关键字:"}},[i("el-input",{directives:[{name:"popover",rawName:"v-popover:popover",arg:"popover"}],attrs:{placeholder:"请输入关键字",clearable:""},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.getFilterData()}},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v(" "),i("el-popover",{ref:"popover",attrs:{placement:"bottom",width:"200",trigger:"focus","popper-class":"search-popover"}},[t.search_list[0]?i("div",[i("p",{staticClass:"popover-title"},[t._v("支持的搜索条件")]),t._v(" "),i("ul",{staticClass:"popover-list"},t._l(t.search_list,function(e,a){return i("li",{key:a,staticClass:"popover-item"},[t._v(t._s(e))])}))]):i("span",[t._v("暂无可搜索项")])])],1):t._e(),t._v(" "),t.filterOptions.guoji?i("el-form-item",{attrs:{label:"国籍:"}},[i("el-select",{attrs:{placeholder:"请选择国籍",clearable:"",filterable:""},model:{value:t.filterData.country_id,callback:function(e){t.$set(t.filterData,"country_id",e)},expression:"filterData.country_id"}},t._l(t.guoji,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.minzu?i("el-form-item",{attrs:{label:"民族:"}},[i("el-select",{attrs:{placeholder:"请选择民族",clearable:"",filterable:""},model:{value:t.filterData.nation_id,callback:function(e){t.$set(t.filterData,"nation_id",e)},expression:"filterData.nation_id"}},t._l(t.minzu,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.select_2?i("el-form-item",{attrs:{label:"用户组:"}},[i("el-select",{attrs:{placeholder:"请选择用户组",clearable:""},model:{value:t.filterData.role,callback:function(e){t.$set(t.filterData,"role",e)},expression:"filterData.role"}},t._l(t.select_2,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.pay?i("el-form-item",{attrs:{label:"支付状态:"}},[i("el-select",{attrs:{placeholder:"请选择支付状态",clearable:""},model:{value:t.filterData.payment_state,callback:function(e){t.$set(t.filterData,"payment_state",e)},expression:"filterData.payment_state"}},t._l(t.zfzt,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.zhifufangshi?i("el-form-item",{attrs:{label:"支付方式:"}},[i("el-select",{attrs:{placeholder:"请选择支付方式",clearable:""},model:{value:t.filterData.pay_plat,callback:function(e){t.$set(t.filterData,"pay_plat",e)},expression:"filterData.pay_plat"}},t._l(t.zhifufangshi,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.shijian?i("el-form-item",{attrs:{label:"事件:"}},[i("el-select",{attrs:{placeholder:"请选择事件",clearable:""},model:{value:t.filterData.shijian,callback:function(e){t.$set(t.filterData,"shijian",e)},expression:"filterData.shijian"}},t._l(t.shijian,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})}))],1):t._e(),t._v(" "),t.filterOptions.date_scope?i("el-form-item",{staticClass:"date-filter",attrs:{label:"日期:"}},[i("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.filterData.date_scope,callback:function(e){t.$set(t.filterData,"date_scope",e)},expression:"filterData.date_scope"}})],1):t._e(),t._v(" "),t.sure?i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.getFilterData()}}},[t._v("确 定")])],1):i("el-form-item",{class:t.open_btn_show?"btn":""},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.getFilterData()}}},[t._v("查 询")]),t._v(" "),t.open_btn_show?i("el-button",{attrs:{type:"primary",plain:"",icon:t.open?"el-icon-arrow-up":"el-icon-arrow-down"},on:{click:function(e){t.open=!t.open,t.btn_text=t.open?"收起":"展开"}}},[t._v(t._s(t.btn_text))]):t._e()],1)],1)],1),t._v(" "),t.filter_arr[0]?i("div",{staticClass:"filter-result-container"},[i("ul",{staticClass:"list"},[t._m(0),t._v(" "),t._l(t.filter_arr,function(e){return e.title?i("li",{key:e.key,staticClass:"item"},[i("el-tag",{staticClass:"tag",attrs:{closable:!1!==t.canClearFilter,size:"small"},on:{close:function(i){t.closeTag(e)}}},[t._v(t._s(e.title+" : "+e.value))])],1):t._e()}),t._v(" "),!1!==t.showClearAllBtn?i("li",{staticClass:"item filter-text clearAll",on:{click:t.closeAllTag}},[t._v("清空")]):t._e()],2)]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"item filter-text"},[e("i",{staticClass:"iconfont icon-filter"}),this._v(" "),e("span",[this._v("检索项：")])])}]},y=i("VU/8")(v,b,!1,null,null,null).exports,D={name:"baseTable",components:{Cell:u,BaseDialogForm:h,pagination:m.a,filterGroup:y},props:["tableConfig","tableBtnConfig","theApi","otherConfig","topBtnConfig","filterConfig","formTitle","formWidth","formConfig","gridEditWidth","formData"],data:function(){return{loading:!1,tableData:[],multipleSelection:[],allSelect:!1,filter_data:{},currentPaging:{currentPage:1,pageSize:10,totals:0},dialogTitle:"",formModel:{},formError:{}}},created:function(){this.getData()},methods:{getData:function(){var t=f()(l.a.mark(function t(e){var i,a,r,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,i={page:this.currentPaging.currentPage,per_page:this.currentPaging.pageSize},a=s()(i,this.filter_data),t.next=5,this.theApi.getData(a);case 5:r=t.sent,this.loading=!1,200===r.code&&(e&&this.$message.success("数据已更新"),n=r||{},this.tableData=n.data||[],n.total&&(this.currentPaging.totals=n.total));case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),createOrUpdate:function(t){var e=this;this.$refs.dialogForm.resetForm(),t?this.getEditData(t.id,function(){e.$refs.dialogForm.showDialog()}):this.$refs.dialogForm.showDialog(),this.dialogTitle=(t?"编辑":"新增")+this.formTitle},getEditData:function(){var t=f()(l.a.mark(function t(e,i){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.theApi.getEdit(e);case 2:200===(a=t.sent).code&&(this.formModel=s()({},a.data[0]||{}),i&&i());case 4:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}(),dialogSubmit:function(){var t=f()(l.a.mark(function t(e){var i,a,r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.theApi[e.id?"editItem":"addItem"](e);case 2:if(200===(i=t.sent).code)this.getData(),this.$message.success(this.dialogTitle+"成功！");else if(a=i.errors||""){for(r in a)a[r]=a[r][0];this.formError=a}case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),handleEmit:function(t,e){this.$emit(t,e)},deleteItem:function(t){var e=this;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.theApi.deleteItem({id:t}).then(function(){200===res.code&&(e.$message.success("删除成功"),e.getData())})}).catch(function(){e.$message.info("取消删除")})},batchDelete:function(){var t=this;this.multipleSelection[0]?this.$confirm("是否删除选择的条目?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.multipleSelection}).catch(function(){t.$message.info("取消删除")}):this.$message.error("请先选择要删除的条目")},handleSelectionChange:function(t){this.multipleSelection=t,this.allSelect=t.length===this.tableData.length},toggleSelection:function(t){var e=this;t&&!this.allSelect?t.forEach(function(t){e.$refs.multipleTable.toggleRowSelection(t,!0)}):this.$refs.multipleTable.clearSelection()},handleSizeChange:function(t){this.currentPaging.pageSize=t,this.currentPaging.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPaging.currentPage=t,this.getData()},filterData:function(t){this.tableData=[],this.filter_data=JSON.parse(r()(t)),this.currentPaging.currentPage=1,this.getData()}}},k={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"myTable"}},[i("filterGroup",t._g({attrs:{filterList:t.filterConfig.filter_list,search_list:t.filterConfig.search_list}},{getFilterData:t.filterData})),t._v(" "),i("div",{staticClass:"piliang"},[t._l(t.topBtnConfig,function(e){return i("router-link",{key:e.title,attrs:{to:e.jumpPage?e.jumpAddress:""}},[e.jumpPage?i("el-button",{staticClass:"float-left",attrs:{type:"primary",icon:e.icon}},[t._v(t._s(e.title))]):i("el-button",{staticClass:"float-left",attrs:{type:"primary",icon:e.icon},on:{click:function(e){t.createOrUpdate()}}},[t._v(t._s(e.title))])],1)}),t._v(" "),i("el-button",{staticClass:"float-right",attrs:{icon:"el-icon-refresh",loading:t.loading},on:{click:function(e){t.getData(!0)}}},[t._v("更新数据")])],2),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"table",staticClass:"baseTable",attrs:{data:t.tableData,border:"",size:"small","tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[t.otherConfig.needSelect?i("el-table-column",{attrs:{type:"selection",width:"55"}}):t._e(),t._v(" "),t._l(t.tableConfig,function(e,a){return i("el-table-column",{key:a,attrs:{prop:e.prop,label:e.label,width:e.width?e.width:"","min-width":e.minWidth?e.minWidth:""},scopedSlots:t._u([{key:"default",fn:function(a){return[e.render?i("Cell",{attrs:{row:a.row,column:e,index:a.$index,render:e.render}}):i("span",[t._v(t._s(a.row[e.prop]))])]}}])})}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:t.tableBtnConfig.width,fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("router-link",{attrs:{to:{path:t.tableBtnConfig.updateAddress,query:{id:e.row.id}}}},[t.tableBtnConfig.update&&t.tableBtnConfig.isUpdateInNewPage?i("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"warning"}},[t._v("编辑")]):t._e()],1),t._v(" "),t.tableBtnConfig.update&&!t.tableBtnConfig.isUpdateInNewPage?i("el-button",{attrs:{type:"warning"},on:{click:function(i){t.createOrUpdate(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),t.tableBtnConfig.delete?i("el-button",{attrs:{type:"danger"},nativeOn:{click:function(i){t.deleteItem(e.row.id)}}},[t._v("删除")]):t._e()]}}])})],2),t._v(" "),i("pagination",t._g({staticClass:"float-right",attrs:{currentPaging:t.currentPaging}},{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange})),t._v(" "),i("BaseDialogForm",{ref:"dialogForm",attrs:{title:t.dialogTitle,width:t.formWidth,config:t.formConfig,"form-data":t.formModel,"err-form":t.formError},on:{submit:t.dialogSubmit}})],1)},staticRenderFns:[]};var C=i("VU/8")(D,k,!1,function(t){i("o3K4")},"data-v-d88b3a48",null);e.a=C.exports},o3K4:function(t,e){},"wbX+":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={};i.d(a,"getData",function(){return o}),i.d(a,"deleteItem",function(){return s}),i.d(a,"batchDelete",function(){return c}),i.d(a,"addItem",function(){return f}),i.d(a,"getEdit",function(){return u}),i.d(a,"editItem",function(){return p});var r=i("//Fk"),n=i.n(r),l=i("2jzb");function o(t){return l.a.get("./static/mock/list.json",{params:t}).then(function(t){return n.a.resolve(t)})}function s(t){return l.a.delete("./static/mock/login.json/"+t.id).then(function(t){return n.a.resolve(t)})}function c(t){return l.a.delete("./static/mock/login.json/"+t.id).then(function(t){return n.a.resolve(t)})}function f(t){return l.a.post("./static/mock/login.json",t).then(function(t){return n.a.resolve(t)})}function u(t){return l.a.get("./static/mock/list.json").then(function(t){return n.a.resolve(t)})}function p(t){return l.a.patch("./static/mock/list.json/"+t.id,t).then(function(t){return n.a.resolve(t)})}var d={name:"classify_list",data:function(){return{configData:{otherConfig:{needSelect:!0},tableConfig:[{label:"ID",prop:"id",width:"70"},{label:"标题",prop:"title"},{label:"排序",prop:"sort",width:"60"}],tableBtnConfig:{width:150,update:!0,delete:!0},topBtnConfig:[{title:"添加分类",icon:"el-icon-circle-plus"}],filterConfig:{filter_list:["search"],search_list:["标题"]},formConfig:[{span:12,label:"标题",prop:"title",type:"text",rules:{required:!0,message:"请输入标题",trigger:"blur"}},{span:12,label:"排序",prop:"sort",type:"el-input-number",rules:{required:!0,message:"请输入排序",trigger:"change"}}],formModel:{title:"",sort:""}},table_ajax:a}},components:{baseTable:i("Nn1j").a}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"classify_list"}},[i("baseTable",{attrs:{theApi:t.table_ajax,"table-config":t.configData.tableConfig,"top-btn-config":t.configData.topBtnConfig,"table-btn-config":t.configData.tableBtnConfig,"other-config":t.configData.otherConfig,"filter-config":t.configData.filterConfig,"grid-edit-width":200,"form-title":"分类","form-width":"60%","form-config":t.configData.formConfig,"form-data":t.configData.formModel}})],1)},staticRenderFns:[]},m=i("VU/8")(d,h,!1,null,null,null);e.default=m.exports}});
//# sourceMappingURL=6.5cf1815726271ac0e36c.js.map