<template>
	<div id="filterGroup">
		<div class="filter-container" :class="{'opened':open,'big':open_btn_show}">
			<!-- 筛选项 -->
			<el-form :inline="true" id="formBox" ref="filterForm">
				<el-form-item label="关键字:" v-if="filterOptions.search">
					<el-input v-popover:popover v-model="filterData.keyword" @keyup.enter.native="getFilterData()"  placeholder="请输入关键字" clearable></el-input>
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
				<el-form-item label="国籍:" v-if="filterOptions.guoji">
					<el-select v-model="filterData.country_id" placeholder="请选择国籍"  clearable filterable>
						<el-option v-for="(item,index) in guoji" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="民族:" v-if="filterOptions.minzu">
					<el-select v-model="filterData.nation_id" placeholder="请选择民族"  clearable filterable>
						<el-option v-for="(item,index) in minzu" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户组:" v-if="filterOptions.select_2">
					<el-select v-model="filterData.role" placeholder="请选择用户组"  clearable>
						<el-option v-for="(item,index) in select_2" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付状态:" v-if="filterOptions.pay">
					<el-select v-model="filterData.payment_state" placeholder="请选择支付状态"  clearable>
						<el-option v-for="(item,index) in zfzt" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付方式:" v-if="filterOptions.zhifufangshi">
					<el-select v-model="filterData.pay_plat" placeholder="请选择支付方式"  clearable>
						<el-option v-for="(item,index) in zhifufangshi" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事件:" v-if="filterOptions.shijian">
					<el-select v-model="filterData.shijian" placeholder="请选择事件"  clearable>
						<el-option v-for="(item,index) in shijian" :key="item.id" :label="item.title" :value="item.id"></el-option>
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
					<el-button type="primary"  @click="getFilterData()">查 询</el-button>
					<el-button
						v-if="open_btn_show"
						type="primary"
						plain
						
						@click="open = !open;btn_text = !open?'展开':'收起'"
						:icon="!open?'el-icon-arrow-down':'el-icon-arrow-up'"
					>{{btn_text}}</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button type="primary"  @click="getFilterData()">确 定</el-button>
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
			district_text: "",
			// 布局状态
			menuType: 1,
			contentWidthType: "Flow",
			isCollapse: false, // 导航是否折叠
			open: false,
			btn_text: "展开",
			open_btn_show: false,
			// 是否是承办机构登录
			isCbjg: false,
			// 映射表
			filterOptions: {
				search: false, // 关键字搜索
				date_scope: false, // 日期选择范围
				select_2: false, // 用户组
				cities: false, //省市区
				pay: false, // 支付状态
				zhifufangshi: false, // 支付方式
				guoji: false, // 国籍
				minzu: false // 民族
			},
			// 点击查询之后传到父级的筛选项数据
			filterData: {},
			// 筛选项数组
			filter_arr: [],
			// 用户组
			select_2: [],
			// 支付方式
			zhifufangshi: [
				{ title: "支付宝", id: 1 },
				{ title: "微信", id: 10 },
				{ title: "银联(个人网银)", id: 20 },
				{ title: "银联(企业网银)", id: 21 }
			],
			// 支付状态
			zfzt: [{ title: "已支付", id: 1 }, { title: "未支付", id: 0 }],
			// 事件
			shijian: [
				{ title: "修改", id: 0 },
				{ title: "删除", id: 1 },
				{ title: "新增", id: 2 }
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
		// 页面宽度
		listenContentWidthType() {
			return this.$store.state.contentWidthType;
		},
		// 导航模式
		listenMenuType() {
			return this.$store.state.menuType;
		},
		// 菜单是否展开
		listenMenuCollapse() {
			return this.$store.state.menuCollapse;
		},
		// 市
		cities() {
			return this.$store.state.filterInfo.cities;
		},
		// 国籍
		guoji() {
			return this.$store.state.filterInfo.country;
		},
		// 民族
		minzu() {
			return this.$store.state.filterInfo.nation;
		},
		// 角色组
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
		this.filterOptions.select_2 && this.getSelect_2(); // 用户组
	},
	mounted: function() {
		const that = this;
		// 首页带参数筛选
		let default_filter = function() {
			// 首页带参数的跳转
			if (that.$route.query.show_filter === "1") {
				if (that.open_btn_show) {
					that.open = true;
					that.btn_text = "收起";
				}
				let homePageFilterObj = {};
				that.filterData = homePageFilterObj;
				that.$emit("getFilterData", that.filterData);
				that.initFilter(that.filterData);
			}
		};
		that.showBtn(default_filter);
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
		// 区域值change
		districtChange: function(val) {
			let newVal = JSON.parse(JSON.stringify(val));
			this.filterData.district_id = newVal.pop();
		},
		// 显示选中的区域值-中文
		show_district_text: function() {
			let dom = document.querySelector(".district_text .el-input__inner");
			this.district_text = dom.getAttribute("value");
		},
		// 用户组
		getSelect_2: function() {
			let data = {};
			get_select_2(data).then(res => {
				if (res.code === 200) {
					this.select_2 = res.data || [];
				}
			});
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
			// 获取区域文字
			if (this.filterOptions.cities) {
				this.show_district_text();
			}
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
				case "district_id":
					item.title = "区域";
					item.value = this.district_text;
					break;
				case "country_id":
					item.title = "国籍";
					item.value = this.arrayMapFilter(this.guoji, val).title;
					break;
				case "nation_id":
					item.title = "民族";
					item.value = this.arrayMapFilter(this.minzu, val).title;
					break;
				case "role":
					item.title = "用户组";
					item.value = this.arrayMapFilter(this.select_2, val).title;
					break;
				case "payment_state":
					item.title = "支付状态";
					item.value = this.arrayMapFilter(this.zfzt, val).title;
					break;
				case "pay_plat":
					item.title = "支付方式";
					item.value = this.arrayMapFilter(
						this.zhifufangshi,
						val
					).title;
					break;
				case "shijian":
					item.title = "事件";
					item.value = this.arrayMapFilter(this.shijian, val).title;
					break;
				case "date_scope":
					item.title = "日期";
					item.value = `${val[0]} - ${val[1]}`;
					break;
				default:
					item = {};
			}
			return item;
		},
		// 筛选项字典内filter
		arrayMapFilter: function(list = [], value) {
			const arr = JSON.parse(JSON.stringify(list));
			let val = value;
			arr.filter(el => {
				if (el.id == val) {
					val = el;
				}
			});
			return val;
		},
		// 关闭筛选
		closeTag: function(item) {
			let key = item.key;
			// 关联字段清除
			if (item.key == "district_id") {
				// 主动清空城市选择器  此处clearValue需要传入一个事件对象 这里是自己模拟一个事件对象来避免报错
				let obj = {};
				obj.stopPropagation = () => {};
				this.$refs.district_dom.clearValue(obj);
				delete this.filterData[key];
			} else {
				delete this.filterData[key];
			}
			this.getFilterData();
		},
		// 清空筛选
		closeAllTag: function() {
			this.filterData = {};
			// 主动清空城市选择器  此处clearValue需要传入一个事件对象 这里是自己模拟一个事件对象来避免报错
			if (this.$refs.district_dom) {
				let obj = {};
				obj.stopPropagation = () => {};
				this.$refs.district_dom.clearValue(obj);
			}
			this.getFilterData();
		}
	}
};
</script>
