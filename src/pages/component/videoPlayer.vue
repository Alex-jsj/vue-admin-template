<template>
	<div id="video-player">
		<topTooltip :info="'基于vue-video-player的视频播放控件'"></topTooltip>
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
				poster: "poster.jpg", //你的封面地址
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
			timeNow: 0 // 开始时间
		};
	},
	components: {
		videoPlayer,
		topTooltip
	},
	methods: {
		// 播放
		onPlayerPlay(player) {
			console.log("开始播放", this.timeNow);
			this.playerSet.timeList.push({
				startTime: this.timeNow,
				endTime: null
			});
		},
		// 暂停
		onPlayerPause(player) {
			console.log("暂停播放", this.timeNow);
			this.playerSet.timeList[
				this.playerSet.timeList.length - 1
			].endTime = this.timeNow;
			this.computeViewTime(this.playerSet.timeList);
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
			// console.log("加载播放资源", player);
			// console.log("当前资源总时长", player.duration());
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
		//
		playerReadied: function(obj) {
			// console.log("播放器初始化", obj);
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
		// 合并数组重合的部分
		mergeTime: function(arr = []) {
			arr.map((item, index) => {
				if (arr[index + 1] && arr[index + 1].startTime < item.endTime) {
					arr[index].endTime = arr[index + 1].endTime;
					arr.splice(index + 1, 1);
				}
			});
			this.computeTime(arr);
		},
		// 计算时长
		computeTime: function(arr = []) {
			console.log(arr);
		}
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player;
		}
	}
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
</style>