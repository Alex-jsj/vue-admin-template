webpackJsonp([14],{"5XwG":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("mvHQ"),a=i.n(n),o=i("3kTw"),s=i("iqGf"),l={data:function(){return{playerOptions:{playbackRates:[.7,1,1.5,2],autoplay:!1,muted:!1,loop:!1,preload:"false",language:"zh-CN",aspectRatio:"16:9",fluid:!0,sources:[{type:"video/mp4",src:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}],poster:"./static/img/login_background@2x.png",width:document.documentElement.clientWidth,notSupportedMessage:"此视频暂无法播放，请稍后再试"},playerSet:{timeList:[],time:null},timeNow:0,playTime:0,viewNodes:[]}},components:{videoPlayer:s.videoPlayer,topTooltip:o.a},methods:{onPlayerPlay:function(e){this.playerSet.timeList.push({startTime:this.timeNow==this.playerSet.time?0:this.timeNow,endTime:null})},onPlayerPause:function(e){this.playerSet.timeList[this.playerSet.timeList.length-1].endTime=this.timeNow,this.computeViewTime(this.playerSet.timeList),this.$message.info("已看过的视频时长百分比："+(this.playTime/this.playerSet.time*100).toFixed(0)+"%"),this.addViewNode(this.viewNodes)},onPlayerEnded:function(e){this.computeViewTime(this.playerSet.timeList)},onPlayerWaiting:function(e){console.log("等待中",e)},onPlayerPlaying:function(e){},onPlayerLoadeddata:function(e){console.log("加载播放资源",e),this.playerSet.time=e.duration()},onPlayerTimeupdate:function(e){},playerStateChanged:function(e){e.hasOwnProperty("timeupdate")&&(this.timeNow=e.timeupdate)},playerReadied:function(e){var t=document.getElementsByClassName("vjs-progress-holder")[0],i=document.createElement("div");i.className="jdrq",i.style.width="100%",i.style.height="0.3em",i.style.position="absolute",i.style.zIndex="1",t.appendChild(i)},computeViewTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=JSON.parse(a()(e));this.timeSort(t)},timeSort:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.sort(function(e,t){return e.startTime-t.startTime}),this.mergeTime(e)},mergeTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function e(t){var i=t.length;return 0===i?[]:1===i?t[0]:void t.map(function(i,n){var a=t[n],o=t[n+1];o&&o.startTime<a.endTime&&o.endTime<a.endTime?(t.splice(n+1,1),e(t)):o&&o.startTime<a.endTime&&(a.endTime=o.endTime,t.splice(n+1,1),e(t))})}(e),this.viewNodes=e;var t=[];e.map(function(e){t.push(e.endTime-e.startTime)}),this.computeTime(t)},computeTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.playTime=parseFloat(function e(t){var i=t.length;return 0===i?0:1===i?t[0]:t[0]+e(t.splice(1))}(e).toFixed(2))},addViewNode:function(e){var t=this,i=JSON.parse(a()(e)),n=document.getElementsByClassName("jdrq")[0];n.innerHTML="";var o=document.createDocumentFragment();i.map(function(e,i){var n=document.createElement("div");n.style.height="100%",n.style.background="#67c23a",n.style.position="absolute",n.style.float="left",n.style.width=(e.endTime-e.startTime)/t.playerSet.time*100+"%",n.style.left=e.startTime/t.playerSet.time*100+"%",o.appendChild(n)}),n.appendChild(o)}},computed:{player:function(){return this.$refs.videoPlayer.player}}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"video-player"}},[i("topTooltip",[e._v(e._s(e.$t("vueVideoPlayer")))]),e._v(" "),i("div",{staticClass:"player"},[i("video-player",{ref:"videoPlayer",staticClass:"video-player vjs-custom-skin",attrs:{playsinline:!0,options:e.playerOptions},on:{play:function(t){e.onPlayerPlay(t)},pause:function(t){e.onPlayerPause(t)},ended:function(t){e.onPlayerEnded(t)},waiting:function(t){e.onPlayerWaiting(t)},playing:function(t){e.onPlayerPlaying(t)},loadeddata:function(t){e.onPlayerLoadeddata(t)},timeupdate:function(t){e.onPlayerTimeupdate(t)},statechanged:function(t){e.playerStateChanged(t)},ready:e.playerReadied}})],1)],1)},staticRenderFns:[]};var d=i("VU/8")(l,r,!1,function(e){i("jufx")},"data-v-7c6812b9",null);t.default=d.exports},jufx:function(e,t){}});
//# sourceMappingURL=14.ab2bf883dd5a97aa0da1.js.map