webpackJsonp([10],{FPsJ:function(e,t,r){"use strict";var o=r("mvHQ"),i=r.n(o),a=r("EB5i"),l=r("503p"),n=r("pFYg"),s=r.n(n),c={name:"cropperComponent",data:function(){return{option:{img:"",size:1,outputType:"webp",info:!0,infoTrue:!0,canScale:!0,autoCrop:!0,autoCropWidth:280,autoCropHeight:160,canMove:!0,original:!1,canMoveBox:!0,fixedBox:!1,full:!1,centerBox:!0,high:!0},fileUpload:{},downImg:"#",crap:!1,previews:{}}},props:{config:Object,id:String},methods:{changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},realTime:function(e){this.previews=e},upload:function(e){var t=this,r=new FormData;"blob"===e&&this.$refs.cropper.getCropBlob(function(e){console.log((e.size/1024).toFixed(0)+"kb"),r.append("file",e),t.$http.post(t.config.ajaxAddress,r,{headers:{Authorization:"token "+localStorage.getItem("admin_token"),"Content-Type":"multipart/form-data"}}).then(function(e){console.log(e.data),t.$message.success("success!")}).catch(function(e){t.$message.error("网络错误，请重试")})})},down:function(e){var t=this;console.log("down");var r=document.createElement("a");r.download="author-img","blob"===e?this.$refs.cropper.getCropBlob(function(e){t.downImg=window.URL.createObjectURL(e),r.href=window.URL.createObjectURL(e),r.click()}):this.$refs.cropper.getCropData(function(e){t.downImg=e,r.href=e,r.click()})},uploadImg:function(e,t){var r=this,o=e.target.files[0];if(console.log((e.target.files[0].size/1024).toFixed(0)+"kb"),e.target.files[0].size/1024/1024>1)return this.$message({message:"上传图片不能超过1M",type:"warning"}),!1;if(this.fileUpload=o,!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))return alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种"),!1;var i=new FileReader;i.onload=function(e){var o=void 0;o="object"===s()(e.target.result)?window.URL.createObjectURL(new Blob([e.target.result])):e.target.result,1===t&&(r.option.img=o)},i.readAsArrayBuffer(o)},imgLoad:function(e){console.log(e)}}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"cropperComponent"},[r("div",{staticClass:"cropper-content"},[r("div",{staticClass:"cropper"},[r("vueCropper",{ref:"cropper",attrs:{img:e.option.img,outputSize:e.option.size,outputType:e.option.outputType,info:e.option.info,infoTrue:e.option.infoTrue,full:e.option.full,canMove:e.option.canMove,canMoveBox:e.option.canMoveBox,original:e.option.original,autoCrop:e.option.autoCrop,autoCropWidth:e.option.autoCropWidth,autoCropHeight:e.option.autoCropHeight,fixedBox:e.option.fixedBox},on:{realTime:e.realTime,imgLoad:e.imgLoad}})],1),e._v(" "),r("div",{staticClass:"show-preview",style:{width:e.previews.w+"px",height:e.previews.h+"px",overflow:"hidden"}},[r("div",{staticClass:"preview",style:e.previews.div},[r("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])]),e._v(" "),r("div",{staticClass:"footer-btn"},[r("div",{staticClass:"scope-btn"},[r("label",{staticClass:"uploads",attrs:{for:e.id}},[e._v("更换图片")]),e._v(" "),r("input",{staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:e.id,accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(t){e.uploadImg(t,1)}}}),e._v(" "),r("el-button",{staticClass:"btn",on:{click:function(t){e.changeScale(1)}}},[r("i",{staticClass:"iconfont icon-enlarge"})]),e._v(" "),r("el-button",{staticClass:"btn",on:{click:function(t){e.changeScale(-1)}}},[r("i",{staticClass:"iconfont icon-narrow"})]),e._v(" "),r("el-button",{staticClass:"btn",on:{click:e.rotateLeft}},[r("i",{staticClass:"iconfont icon-left-rotate"})]),e._v(" "),r("el-button",{staticClass:"btn",on:{click:e.rotateRight}},[r("i",{staticClass:"iconfont icon-right-rotate"})])],1),e._v(" "),r("div",{staticClass:"upload-btn"},[e.option.img?r("el-button",{staticClass:"btn",on:{click:function(t){e.upload("blob")}}},[r("i",{staticClass:"iconfont icon-intro"}),e._v("\n\t\t\t\t上传\n\t\t\t")]):e._e()],1)])])},staticRenderFns:[]};var f=r("VU/8")(c,m,!1,function(e){r("NKm9")},"data-v-0e65c6a6",null).exports,p={name:"film_add_edit",data:function(){return{recommendList:[{value:"tm",label:"D20提名",children:[{value:"shejiyuanze",label:"D20年度作品"},{value:"daohang",label:"D20年度作者"},{value:"daohang",label:"D20年度新锐"}]},{value:"ct",label:"IDF创投",children:[{value:"yx",label:"IDF优选提案"}]},{value:"py",label:"IDF培育计划",children:[{value:"2",label:"最具潜力发展计划"}]}],classifyList:[{id:1,title:"D20提名"},{id:2,title:"IDF创投"},{id:3,title:"IDF论坛"}],years:["2017","2018","2019"],uploadUrl:"/api/student_attach",loading:!1,form:{lan:"中文",title:"",photo:"",video:"",classify:"",type:"",time:"",director:"",recommend:[],filmLang:""},formError:{photo:""},rules:{title:[{required:!0,message:"请输入片名",trigger:"blur"}],type:[{required:!0,message:"请输入类型",trigger:"blur"}],time:[{required:!0,message:"请输入时长",trigger:"blur"}],director:[{required:!0,message:"请输入导演",trigger:"blur"}],filmLang:[{required:!0,message:"请输入影片语言",trigger:"blur"}],year:[{required:!0,message:"请选择年份",trigger:"change"}],lan:[{required:!0,message:"请选择语言",trigger:"change"}],classify:[{required:!0,message:"请选择分类",trigger:"change"}],photo:[{required:!0,message:"请选择图片",trigger:"change"}],video:[{required:!0,message:"请上传视频",trigger:"change"}]},uploadConfig:{ajaxAddress:"https://jsonplaceholder.typicode.com/posts/",autoCropWidth:200,autoCropHeight:200}}},props:{type:String},components:{tinymceEditor:l.a,cropper:f},methods:{resetForm:function(){this.$refs.form.resetFields(),this.formError={}},submitForm:function(){var e=this;e.formError={},e.$refs.form.validate(function(t){if(t){e.loading=!0;var r=JSON.parse(i()(e[_form])),o=e.type+"Item";for(var l in a)o===l&&a[l](r).then(function(t){if(e.loading=!1,200===t.code)"add"==formName?e.$message.success("新增成功"):e.$message.success("数据更新成功");else{var r=t.errors||"";if(r){for(var o in r)r[o]=r[o][0];e.formError=r}}}).catch(function(){e.loading=!1})}else e.loading=!1})}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"add_edit"}},[r("el-form",{ref:"form",staticStyle:{width:"1000px",margin:"0 auto"},attrs:{model:e.form,"label-width":"110px",rules:e.rules}},[r("el-form-item",{attrs:{label:"语言：",prop:"lan",error:e.formError.lan}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.form.lan,callback:function(t){e.$set(e.form,"lan",t)},expression:"form.lan"}},e._l(["中文","English"],function(e,t){return r("el-option",{key:t,attrs:{label:e,value:e}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"分类：",prop:"classify",error:e.formError.classify}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.form.classify,callback:function(t){e.$set(e.form,"classify",t)},expression:"form.classify"}},e._l(e.classifyList,function(e,t){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"年份：",prop:"year",error:e.formError.year}},[r("el-select",{staticStyle:{width:"100%"},model:{value:e.form.year,callback:function(t){e.$set(e.form,"year",t)},expression:"form.year"}},e._l(e.years,function(e,t){return r("el-option",{key:t,attrs:{label:e,value:e}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"片名：",prop:"title",error:e.formError.title}},[r("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"影片语言：",prop:"filmLang",error:e.formError.filmLang}},[r("el-input",{model:{value:e.form.filmLang,callback:function(t){e.$set(e.form,"filmLang",t)},expression:"form.filmLang"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"时长：",prop:"time",error:e.formError.time}},[r("el-input",{model:{value:e.form.time,callback:function(t){e.$set(e.form,"time",t)},expression:"form.time"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"导演：",prop:"director",error:e.formError.director}},[r("el-input",{model:{value:e.form.director,callback:function(t){e.$set(e.form,"director",t)},expression:"form.director"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"类型：",prop:"type",error:e.formError.type}},[r("el-input",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"获奖影片推荐："}},[r("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.recommendList},model:{value:e.form.recommend,callback:function(t){e.$set(e.form,"recommend",t)},expression:"form.recommend"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"展示图片：",prop:"photo",error:e.formError.photo}},[r("cropper",{attrs:{config:e.uploadConfig,id:"id1"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频文件：",prop:"video",error:e.formError.video}},[r("el-input",{attrs:{type:"file"},model:{value:e.form.video,callback:function(t){e.$set(e.form,"video",t)},expression:"form.video"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"简介："}},[r("tinymceEditor")],1),e._v(" "),r("el-form-item",[r("el-button",{staticClass:"my-button",attrs:{type:"primary",size:"small",loading:e.loading},on:{click:function(t){e.submitForm()}}},[e._v("提 交")]),e._v(" "),r("el-button",{staticClass:"my-button",attrs:{size:"small"},on:{click:function(t){e.resetForm()}}},[e._v("重 置")])],1)],1)],1)},staticRenderFns:[]},d=r("VU/8")(p,u,!1,null,null,null);t.a=d.exports},NKm9:function(e,t){},Nd5q:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"edit_film",components:{AddEdit:r("FPsJ").a}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"edit_film"}},[t("AddEdit",{attrs:{type:"edit"}})],1)},staticRenderFns:[]},a=r("VU/8")(o,i,!1,null,null,null);t.default=a.exports}});
//# sourceMappingURL=10.dda34bb4a41db205407b.js.map