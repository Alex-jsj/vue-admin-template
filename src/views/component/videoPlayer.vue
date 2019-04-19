<template>
	<div id="video-player">
		<topTooltip>{{$t('vueVideoPlayer')}}</topTooltip>
		<div class="player">
			<video-player
				class="video-player vjs-custom-skin"
				ref="videoPlayer"
				:playsinline="true"
				:options="playerOptions"
				@play="onPlayerPlay($event)"
				@pause="onPlayerPause($event)"
				@ended="onPlayerEnded($event)"
				@waiting="onPlayerWaiting($event)"
				@playing="onPlayerPlaying($event)"
				@loadeddata="onPlayerLoadeddata($event)"
				@timeupdate="onPlayerTimeupdate($event)"
				@statechanged="playerStateChanged($event)"
				@ready="playerReadied"
			></video-player>
		</div>
	</div>
</template>
 
<script>
import topTooltip from "components/topTooltip";
import { videoPlayer } from "vue-video-player";
export default {
	data() {
		return {
			playerOptions: {
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoplay: false, //如果true,浏览器准备好时开始回放。
				muted: false, // 默认情况下将会消除任何音频。
				loop: false, // 导致视频一结束就重新开始。
				preload: "false", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: "zh-CN",
				aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: "video/mp4",
						src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
					}
				],
				poster: "./static/img/login_background@2x.png", //你的封面地址
				width: document.documentElement.clientWidth,
				notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				//        controlBar: {
				//          timeDivider: true,
				//          durationDisplay: true,
				//          remainingTimeDisplay: false,
				//          fullscreenToggle: true  //全屏按钮
				//        }
			},
			playerSet: {
				timeList: [],
				time: null //总时长
			},
			timeNow: 0, // 开始时间
			playTime: 0, //已播放时间
			viewNodes: [] // 已看过的视频片段节点
		};
	},
	components: {
		videoPlayer,
		topTooltip
	},
	methods: {
		// 播放
		onPlayerPlay(player) {
			// 设置开始时间
			this.playerSet.timeList.push({
				startTime:
					this.timeNow == this.playerSet.time ? 0 : this.timeNow,
				endTime: null
			});
		},
		// 暂停
		onPlayerPause(player) {
			// 设置结束时间
			this.playerSet.timeList[
				this.playerSet.timeList.length - 1
			].endTime = this.timeNow;
			// 计算已观看百分比
			this.computeViewTime(this.playerSet.timeList);
			this.$message.info(
				`已看过的视频时长百分比：${(
					(this.playTime / this.playerSet.time) *
					100
				).toFixed(0)}%`
			);
			// 添加看过的片段节点
			this.addViewNode(this.viewNodes);
		},
		//
		onPlayerEnded(player) {
			this.computeViewTime(this.playerSet.timeList);
			// console.log("是否处于“已结束”状态", player);
		},
		//
		onPlayerWaiting(player) {
			console.log("等待中", player);
		},
		//
		onPlayerPlaying(player) {
			// console.log("正在播放中", player);
		},
		//
		onPlayerLoadeddata(player) {
			console.log("加载播放资源", player);
			// console.log("当前资源总时长", player.duration());
			this.playerSet.time = player.duration();
		},
		//
		onPlayerTimeupdate(player) {
			// console.log("播放时间更新", player);
		},
		//
		playerStateChanged(obj) {
			// console.log("播放器状态变更", obj);
			if (obj.hasOwnProperty("timeupdate")) {
				// 记录当前播放的时间点
				this.timeNow = obj.timeupdate;
			}
		},
		// 初始化
		playerReadied: function(obj) {
			// 创造节点容器
			let playerProgressHtml = document.getElementsByClassName(
				"vjs-progress-holder"
			)[0];
			let container = document.createElement("div");
			container.className = "jdrq";
			container.style.width = "100%";
			container.style.height = "0.3em";
			container.style.position = "absolute";
			container.style.zIndex = "1";
			playerProgressHtml.appendChild(container);
		},
		// 计算观看时长
		computeViewTime: function(arr = []) {
			const viewTime = JSON.parse(JSON.stringify(arr));
			this.timeSort(viewTime);
		},
		// 按开始时间大小重新排序
		timeSort: function(arr = []) {
			let list = arr;
			list.sort(function(a, b) {
				return a.startTime - b.startTime;
			});
			this.mergeTime(arr);
		},
		// 合并数组重合的部分并生成只包含片段长度的数组
		mergeTime: function(arr = []) {
			// 递归合并
			function mergeArr(arr) {
				let len = arr.length;
				if (len === 0) {
					return [];
				} else if (len === 1) {
					return arr[0];
				} else {
					arr.map((item, index) => {
						let arr1 = arr[index];
						let arr2 = arr[index + 1];
						// [9,18] [10,17] 完全重合的情况
						if (
							arr2 &&
							arr2.startTime < arr1.endTime &&
							arr2.endTime < arr1.endTime
						) {
							arr.splice(index + 1, 1);
							mergeArr(arr);
						} else if (arr2 && arr2.startTime < arr1.endTime) {
							// [9,11] [10,22] 相交的情况
							arr1.endTime = arr2.endTime;
							arr.splice(index + 1, 1);
							mergeArr(arr);
						}
					});
				}
			}
			mergeArr(arr);
			this.viewNodes = arr;
			// 生成时间长度数组
			let list = [];
			arr.map(item => {
				list.push(item.endTime - item.startTime);
			});
			this.computeTime(list);
		},
		// 计算时长(求和)
		computeTime: function(list = []) {
			let _arr = list;
			function _sum(arr) {
				let len = arr.length;
				if (len === 0) {
					return 0;
				} else if (len === 1) {
					return arr[0];
				} else {
					return arr[0] + _sum(arr.splice(1));
				}
			}
			this.playTime = parseFloat(_sum(_arr).toFixed(2));
		},
		// 添加已观看的时长节点
		addViewNode: function(arr) {
			const list = JSON.parse(JSON.stringify(arr));
			let container = document.getElementsByClassName("jdrq")[0];
			container.innerHTML = "";
			let frag = document.createDocumentFragment();
			list.map((item, index) => {
				let div = document.createElement("div");
				div.style.height = "100%";
				div.style.background = "#67c23a";
				div.style.position = "absolute";
				div.style.float = "left";
				div.style.width =
					((item.endTime - item.startTime) / this.playerSet.time) *
						100 +
					"%";
				div.style.left =
					(item.startTime / this.playerSet.time) * 100 + "%";
				frag.appendChild(div);
			});
			container.appendChild(frag);
		}
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player;
		}
	}
};
</script>

<style lang="less" scoped>
/deep/.video-js .vjs-play-progress:before {
	z-index: 2;
}
</style>