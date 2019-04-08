<template>
	<div id="filterGroup">
		<div class="filter-container" :class="{'opened':open,'big':open_btn_show}">
			<!-- 筛选项 -->
			<el-form :inline="true" id="formBox" ref="filterForm">
				<el-form-item label="关键字:" v-if="filterOptions.search">
					<el-input v-popover:popover v-model="filterData.keyword" @keyup.enter.native="getFilterData()" placeholder="请输入关键字" clearable></el-input>
					<el-popover ref="popover" placement="bottom" width="200" trigger="focus" popper-class="search-popover">
						<div v-if="search_list[0]">
							<p class="popover-title">支持的搜索条件</p>
							<ul class="popover-list">
								<li class="popover-item" v-for="(item, index) in search_list" :key="index">{{item}}</li>
							</ul>
						</div>
						<span v-else>暂无可搜索项</span>
					</el-popover>
				</el-form-item>
				<el-form-item label="分类:" v-if="filterOptions.classify">
					<el-select v-model="filterData.classify" clearable>
						<el-option v-for="(item,index) in classifyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="年份:" v-if="filterOptions.year">
					<el-select v-model="filterData.year" clearable>
						<el-option v-for="(item,index) in years" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="注册年份:" v-if="filterOptions.registerYear">
					<el-select v-model="filterData.registerYear" clearable>
						<el-option v-for="(item,index) in registerYears" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="激活状态:" v-if="filterOptions.activation">
					<el-select v-model="filterData.activation" clearable>
						<el-option v-for="(item,index) in activationList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核状态:" v-if="filterOptions.examine">
					<el-select v-model="filterData.examine" clearable>
						<el-option v-for="(item,index) in examineList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="轮播图状态:" v-if="filterOptions.imgType">
					<el-select v-model="filterData.imgType" clearable>
						<el-option v-for="(item,index) in imgTypeList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:" v-if="filterOptions.operator">
					<el-select v-model="filterData.operator" clearable>
						<el-option v-for="(item,index) in operatorList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事件:" v-if="filterOptions.event">
					<el-select v-model="filterData.event" clearable>
						<el-option v-for="(item,index) in eventList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="影片推荐:" v-if="filterOptions.recommend">
					<el-cascader ref="recommend_dom" class="recommend_text" :options="recommendList" v-model="filterData.recommend" filterable clearable></el-cascader>
				</el-form-item>
				<el-form-item label="报名类型:" v-if="filterOptions.signType">
					<el-select v-model="filterData.signType" clearable>
						<el-option v-for="(item,index) in signTypeList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="片种:" v-if="filterOptions.filmType">
					<el-select v-model="filterData.filmType" clearable>
						<el-option v-for="(item,index) in filmTypeList" :key="index.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期:" v-if="filterOptions.date_scope" class="date-filter">
					<el-date-picker
						v-model="filterData.date_scope"
						type="daterange"
						align="right"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-form-item>
				<el-form-item :class="open_btn_show?'btn':''" v-if="!sure">
					<el-button type="primary" @click="getFilterData()">查 询</el-button>
					<el-button
						v-if="open_btn_show"
						type="primary"
						plain
						@click="open = !open;btn_text = !open?'展开':'收起'"
						:icon="!open?'el-icon-arrow-down':'el-icon-arrow-up'"
					>{{btn_text}}</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button type="primary" @click="getFilterData()">确 定</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 筛选结果项 -->
		<div class="filter-result-container" v-if="filter_arr[0]">
			<ul class="list">
				<li class="item filter-text">
					<i class="iconfont icon-filter"></i>
					<span>检索项：</span>
				</li>
				<li class="item" v-for="item in filter_arr" :key="item.key" v-if="item.title">
					<el-tag :closable="canClearFilter !== false" size="small" class="tag" @close="closeTag(item)">{{`${item.title} : ${item.value}`}}</el-tag>
				</li>
				<li class="item filter-text clearAll" @click="closeAllTag" v-if="showClearAllBtn !== false">清空</li>
			</ul>
		</div>
	</div>
</template>

<script>
// css
import "components/filterGroup/style.css";

export default {
	// 筛选项
	name: "filterGroup",
	data() {
		return {
			// 布局状态
			menuType: 1,
			contentWidthType: "流式",
			isCollapse: false, // 导航是否折叠
			open: false,
			btn_text: "展开",
			open_btn_show: false,
			// 映射表
			filterOptions: {
				search: false, // 关键字搜索
				classify: false, // 分类
				year: false, // 年份
				registerYear: false, // 注册年份
				activation: false, // 激活状态
				examine: false, // 审核状态
				recommend: false, // 影片推荐
				operator: false, // 操作人
				event: false, // 事件
				signType: false, // 报名类型
				filmType: false, // 片种
				imgType: false, // 轮播图状态
				date_scope: false // 日期选择范围
			},
			// 点击查询之后传到父级的筛选项数据
			filterData: {},
			// 筛选项数组
			filter_arr: [],
			// 分类
			classifyList: [],
			// 年份
			years: [],
			// 注册年份
			registerYears: [],
			// 激活状态
			activationList: [
				{
					value: 1,
					label: "已激活"
				},
				{
					value: -1,
					label: "未激活"
				}
			],
			// 轮播图状态
			imgTypeList: [
				{
					value: 1,
					label: "启用"
				},
				{
					value: -1,
					label: "隐藏"
				}
			],
			// 审核状态
			examineList: [
				{
					value: 1,
					label: "已通过"
				},
				{
					value: 0,
					label: "未审核"
				},
				{
					value: -1,
					label: "驳回"
				}
			],
			// 影片推荐
			recommendList: [],
			// 报名类型
			signTypeList: [
				{
					value: 0,
					label: "D20提名"
				},
				{
					value: 1,
					label: "IDF创投"
				}
			],
			// 片种
			filmTypeList: [],
			// 操作人
			operatorList: [],
			// 事件
			eventList: [
				{
					value: 1,
					label: "新增"
				},
				{
					value: 0,
					label: "编辑"
				},
				{
					value: -1,
					label: "删除"
				}
			]
		};
	},
	props: {
		// 筛选项配置 外部传入
		filterList: Array,
		search_list: Array, // 搜索框支持的搜索项
		sure: true,
		showClearAllBtn: true, // 是否显示清空按钮
		canClearFilter: true // 是否能清除单个筛选
	},
	watch: {
		listenContentWidthType(newVal) {
			this.contentWidthType = newVal;
			this.showBtn();
		},
		listenMenuType(newVal) {
			this.menuType = newVal;
			this.showBtn();
		},
		listenMenuCollapse(newVal) {
			this.isCollapse = newVal;
			this.showBtn();
		}
	},
	computed: {
		listenContentWidthType() {
			return this.$store.state.contentWidthType;
		},
		listenMenuType() {
			return this.$store.state.menuType;
		},
		listenMenuCollapse() {
			return this.$store.state.menuCollapse;
		},
		role() {
			return this.$store.state.role;
		}
	},
	created: function() {
		// 匹配显示
		for (let key in this.filterOptions) {
			for (let k in this.filterList) {
				if (this.filterList[k] == key) {
					this.filterOptions[key] = true;
				}
			}
		}
	},
	mounted: function() {
		// 首页带参数筛选
		let default_filter = () => {
			let homePageFilterObj = {};
			// 首页带参数的跳转
			if (this.$route.query.show_filter === "1") {
				if (this.open_btn_show) {
					this.open = true;
					this.btn_text = "收起";
				}
				if (this.$route.query.d20 === "true") {
					Object.assign(homePageFilterObj, { signType: 0 });
				}
				if (this.$route.query.idf === "true") {
					Object.assign(homePageFilterObj, { signType: 1 });
				}
				this.filterData = homePageFilterObj;
				this.$emit("getFilterData", this.filterData);
				this.initFilter(this.filterData);
			}
		};
		this.showBtn(default_filter);
	},
	methods: {
		// 判断是否需要显示展开收起按钮
		showBtn: function(callback) {
			// 加上300的延时 因为css切换的过渡时间是.3s
			setTimeout(() => {
				const formContainer = document.getElementById("formBox");
				this.open_btn_show =
					formContainer.clientHeight > 50 ? true : false;
				// 回调函数
				callback && callback();
			}, 310);
		},
		// 显示选中的值-影片推荐
		show_recommend_text: function() {
			let dom =
				document.querySelector(".recommend_text .el-cascader__label") ||
				"noDom";
			if (dom !== "noDom") {
				return dom.textContent.trim();
			}
		},
		// 传递筛选数据
		getFilterData() {
			let obj = this.filterData;
			for (let key in obj) {
				if (obj[key] === "" || obj[key] === null) {
					delete obj[key];
				} else {
					if (key === "date_scope") {
						// 拆分数组
						const [exam_start_time, exam_end_time] = obj[key];
						Object.assign(
							obj,
							{ exam_start_time },
							{ exam_end_time }
						);
					}
				}
			}
			this.$emit("getFilterData", obj);
			this.initFilter(obj);
		},
		// 生成筛选项列表数据
		initFilter: function(filterList = {}) {
			const filter_list = filterList;
			let arr = [];
			for (let key in filter_list) {
				if (
					filter_list[key] !== "" &&
					filter_list[key] !== undefined &&
					filter_list[key] !== null
				) {
					arr.push({
						key: key,
						title: this.filterMap(key, filter_list[key]).title,
						value: this.filterMap(key, filter_list[key]).value
					});
				}
			}
			this.filter_arr = arr;
		},
		// 筛选项列表字典
		filterMap: function(theKey = "", theValue) {
			const key = theKey;
			const val = theValue;
			let item = {};
			switch (key) {
				case "keyword":
					item.title = "关键字";
					item.value = val;
					break;
				case "date_scope":
					item.title = "日期";
					item.value = `${val[0]} - ${val[1]}`;
					break;
				case "activation":
					item.title = "激活状态";
					item.value = this.arrayMapFilter(
						this.activationList,
						val
					).label;
					break;
				case "examine":
					item.title = "审核状态";
					item.value = this.arrayMapFilter(
						this.examineList,
						val
					).label;
					break;
				case "signType":
					item.title = "报名类型";
					item.value = this.arrayMapFilter(
						this.signTypeList,
						val
					).label;
					break;
				case "filmType":
					item.title = "片种";
					item.value = this.arrayMapFilter(
						this.filmTypeList,
						val
					).label;
					break;
				case "imgType":
					item.title = "轮播图状态";
					item.value = this.arrayMapFilter(
						this.imgTypeList,
						val
					).label;
					break;
				case "event":
					item.title = "事件";
					item.value = this.arrayMapFilter(this.eventList, val).label;
					break;
				case "operator":
					item.title = "操作人";
					item.value = this.arrayMapFilter(
						this.operatorList,
						val
					).label;
					break;
				case "classify":
					item.title = "分类";
					item.value = this.arrayMapFilter(
						this.classifyList,
						val
					).label;
					break;
				case "year":
					item.title = "年份";
					item.value = val;
					break;
				case "registerYear":
					item.title = "注册年份";
					item.value = val;
					break;
				case "recommend":
					item.title = "影片推荐";
					item.value = this.show_recommend_text();
					break;
				default:
					item = {};
			}
			return item;
		},
		// 筛选项字典内filter
		arrayMapFilter: function(list = [], value = "") {
			const arr = JSON.parse(JSON.stringify(list));
			let val = value;
			arr.filter(el => {
				if (el.value == val) {
					val = el;
				}
			});
			return val;
		},
		// 关闭筛选
		closeTag: function(item) {
			let key = item.key;
			// 关联字段清除
			if (item.key == "recommend") {
				// 主动清空城市选择器  此处clearValue需要传入一个事件对象 这里是自己模拟一个事件对象来避免报错
				let obj = {};
				obj.stopPropagation = () => {};
				this.$refs.recommend_dom.clearValue(obj);
				delete this.filterData[key];
			} else {
				delete this.filterData[key];
			}
			this.getFilterData();
		},
		// 清空筛选
		closeAllTag: function() {
			this.filterData = {};
			this.getFilterData();
		}
	}
};
</script>
