<template>
	<div class="cropperComponent">
		<div class="cropper-content">
			<div class="cropper">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="option.info"
					:infoTrue="option.infoTrue"
					:full="option.full"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:original="option.original"
					:autoCrop="option.autoCrop"
					:autoCropWidth="option.autoCropWidth"
					:autoCropHeight="option.autoCropHeight"
					:fixedBox="option.fixedBox"
					@realTime="realTime"
					@imgLoad="imgLoad"
				></vueCropper>
			</div>
			<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden'}">
				<div :style="previews.div" class="preview">
					<img :src="previews.url" :style="previews.img">
				</div>
			</div>
		</div>
		<div class="footer-btn">
			<div class="scope-btn">
				<label class="uploads" :for="id">更换图片</label>
				<input
					type="file"
					:id="id"
					style="position:absolute; clip:rect(0 0 0 0);"
					accept="image/png, image/jpeg, image/gif, image/jpg"
					@change="uploadImg($event, 1)"
				>
				<el-button  class="btn" @click="changeScale(1)">
					<i class="iconfont icon-enlarge"></i>
				</el-button>
				<el-button  class="btn" @click="changeScale(-1)">
					<i class="iconfont icon-narrow"></i>
				</el-button>
				<el-button  class="btn" @click="rotateLeft">
					<i class="iconfont icon-left-rotate"></i>
				</el-button>
				<el-button  class="btn" @click="rotateRight">
					<i class="iconfont icon-right-rotate"></i>
				</el-button>
			</div>
			<div class="upload-btn">
				<el-button  class="btn" @click="upload('blob')" v-if="option.img">
					<i class="iconfont icon-intro"></i>
					上传
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// https://github.com/xyxiao001/vue-cropper
	name: "cropperComponent",
	data() {
		return {
			option: {
				img: "", //裁剪图片的地址  url 地址 || base64 || blob
				size: 1, //裁剪生成图片的质量  0.1 - 1
				outputType: "webp", // 裁剪生成图片的格式  jpeg || png || webp
				info: true, //裁剪框的大小信息
				infoTrue: true, //裁剪框的大小信息
				canScale: true, //图片是否允许滚轮缩放
				autoCrop: true, //是否默认生成截图框
				autoCropWidth: 280,
				autoCropHeight: 160,
				canMove: true, //上传图片是否可以移动
				original: false, //上传图片按照原始比例渲染
				canMoveBox: true, //截图框能否拖动
				fixedBox: false, //固定截图框大小 不允许改变
				full: false, //是否输出原图比例的截图
				centerBox: true, //截图框是否被限制在图片里面
				high: true //是否按照设备的dpr 输出等比例图片
			},
			fileUpload: {},
			downImg: "#",
			crap: false,
			previews: {}
		};
	},
	props: {
		// 配置
		config: Object,
		id: String
	},
	methods: {
		changeScale(num) {
			num = num || 1;
			this.$refs.cropper.changeScale(num);
		},
		rotateLeft() {
			this.$refs.cropper.rotateLeft();
		},
		rotateRight() {
			this.$refs.cropper.rotateRight();
		},
		// 实时预览函数
		realTime(data) {
			this.previews = data;
		},
		upload(type) {
			let formData = new FormData();
			if (type === "blob") {
				this.$refs.cropper.getCropBlob(data => {
					// let img = window.URL.createObjectURL(data);
					console.log((data.size / 1024).toFixed(0) + "kb");
					formData.append("file", data);
					this.$http
						.post(this.config.ajaxAddress, formData, {
							headers: {
								Authorization: `token ${localStorage.getItem(
									"admin_token"
								)}`,
								"Content-Type": "multipart/form-data"
							}
						})
						.then(res => {
							console.log(res.data);
							this.$message.success(`success!`);
						})
						.catch(err => {
							this.$message.error("网络错误，请重试");
						});
				});
			} else {
				// 预留
			}
		},
		// 下载图片
		down(type) {
			console.log("down");
			var aLink = document.createElement("a");
			aLink.download = "author-img";
			if (type === "blob") {
				this.$refs.cropper.getCropBlob(data => {
					this.downImg = window.URL.createObjectURL(data);
					aLink.href = window.URL.createObjectURL(data);
					aLink.click();
				});
			} else {
				this.$refs.cropper.getCropData(data => {
					this.downImg = data;
					aLink.href = data;
					aLink.click();
				});
			}
		},
		uploadImg(e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0];
			console.log((e.target.files[0].size / 1024).toFixed(0) + "kb");
			if (e.target.files[0].size / 1024 / 1024 > 1) {
				this.$message({
					message: "上传图片不能超过1M",
					type: "warning"
				});
				// 超过1M
				return false;
			}
			this.fileUpload = file;
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
				return false;
			}
			var reader = new FileReader();
			reader.onload = e => {
				let data;
				if (typeof e.target.result === "object") {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(
						new Blob([e.target.result])
					);
				} else {
					data = e.target.result;
				}
				if (num === 1) {
					this.option.img = data;
				}
			};
			// reader.readAsDataURL(file); // 转化为base64
			reader.readAsArrayBuffer(file); // 转化为blob
		},
		imgLoad(msg) {
			console.log(msg);
		}
	}
};
</script>
<style lang="less" scoped>
.cropperComponent {
	width: 100%;
	height: 400px;
	margin: 0 auto;
	.cropper-content {
		display: flex;
		justify-content: flex-end;
		.cropper {
			width: 400px;
			height: 300px;
		}
		.show-preview {
			flex: 1;
			display: flex;
			justify-content: center;
			.preview {
				overflow: hidden;
				border: 1px solid #cccccc;
				background: #cccccc;
				margin-left: 40px;
			}
		}
	}
	.footer-btn {
		margin-top: 30px;
		display: flex;
		justify-content: flex-end;
		.scope-btn {
			width: 400px;
			display: flex;
			justify-content: space-between;
		}
		.upload-btn {
			flex: 1;
			display: flex;
			justify-content: center;
		}
		.btn {
			.iconfont {
				font-size: 20px;
			}
		}
		.uploads {
			border: 1px solid #dcdfe6;
			padding: 0 15px;
			border-radius: 4px;
			cursor: pointer;
			color: #606266;
			transition: 0.1s;
			&:hover {
				color: #409eff;
				border-color: #c6e2ff;
				background-color: #ecf5ff;
			}
			&:active {
				color: #3a8ee6;
				border-color: #3a8ee6;
			}
		}
	}
}
</style>
