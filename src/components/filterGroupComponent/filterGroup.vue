<template>
	<div id="filterGroup">
		<div class="filter-container" :class="{'opened':open,'big':open_btn_show}">
			<!-- 筛选项 -->
			<el-form :inline="true" id="formBox" ref="filterForm">
				<el-form-item label="关键字:" v-if="filterOptions.search">
					<el-input v-popover:popover v-model="filterData.keyword" @keyup.enter.native="getFilterData()" size="mini" placeholder="请输入关键字" clearable></el-input>
					<el-popover ref="popover" placement="bottom" width="200" trigger="focus" popper-class="search-popover">
						<div v-if="search_list[0]">
							<p class="popover-title">目前支持的搜索条件</p>
							<ul class="popover-list">
								<li class="popover-item" v-for="(item, index) in search_list" :key="index">{{item}}</li>
							</ul>
						</div>
						<span v-else>暂无可搜索项</span>
					</el-popover>
				</el-form-item>
				<el-form-item label="国籍:" v-if="filterOptions.guoji">
					<el-select v-model="filterData.country_id" placeholder="请选择国籍" size="mini" clearable filterable>
						<el-option v-for="(item,index) in guoji" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="民族:" v-if="filterOptions.minzu">
					<el-select v-model="filterData.nation_id" placeholder="请选择民族" size="mini" clearable filterable>
						<el-option v-for="(item,index) in minzu" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域:" v-if="filterOptions.cities && !isCbjg">
					<el-cascader ref="district_dom" class="district_text" :options="cities" change-on-select @change="districtChange" size="mini" clearable filterable></el-cascader>
				</el-form-item>
				<el-form-item label="承办机构:" v-if="filterOptions.cbjg && !isCbjg">
					<el-select v-model="filterData.agent_id" placeholder="请选择承办机构" size="mini" @change="getBatch" filterable clearable>
						<el-option v-for="(item,index) in cbjg" :key="item.id" :label="item.code+' - '+item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考次:" v-if="filterOptions.kaoci">
					<el-select v-model="filterData.season" placeholder="请选择考次" size="mini" @change="setBatch" clearable filterable>
						<el-option v-for="(item,index) in kaoci" :key="item.id" :label="item.code+' - '+item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="批次:" v-if="filterOptions.pici">
					<el-select v-model="filterData.import_batch_id" placeholder="请选择批次" size="mini" clearable filterable>
						<el-option v-for="(item,index) in pici" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="场次:" v-if="filterOptions.changci">
					<el-select v-model="filterData.batch_id" placeholder="请选择场次" size="mini" clearable filterable>
						<el-option v-for="(item,index) in changci" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="科目:" v-if="filterOptions.kemu">
					<el-select v-model="filterData.subject_id" placeholder="请选择科目" size="mini" clearable filterable>
						<el-option v-for="(item,index) in kemu" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="级别:" v-if="filterOptions.jibie">
					<el-select v-model="filterData.rank" placeholder="请选择级别" size="mini" clearable>
						<el-option v-for="(item,index) in jb" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考场:" v-if="filterOptions.kaochang">
					<el-select v-model="filterData.kaochang" placeholder="请选择考场" size="mini" clearable filterable>
						<el-option v-for="(item,index) in kaochang" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="拼音:" v-if="filterOptions.pinyin">
					<el-select v-model="filterData.pinyin" placeholder="请选择拼音" size="mini" clearable filterable>
						<el-option v-for="(item,index) in pinyin" :key="item.id" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态:" v-if="filterOptions.select_1">
					<el-select v-model="filterData.state" placeholder="请选择状态" size="mini" clearable>
						<el-option v-for="(item,index) in select_1" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考场状态:" v-if="filterOptions.select_3">
					<el-select v-model="filterData.select_3" placeholder="请选择考场状态" size="mini" clearable>
						<el-option v-for="(item,index) in select_3" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户组:" v-if="filterOptions.select_2">
					<el-select v-model="filterData.role" placeholder="请选择用户组" size="mini" clearable>
						<el-option v-for="(item,index) in select_2" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户:" v-if="filterOptions.select_4">
					<el-select v-model="filterData.select_4" placeholder="请选择用户" size="mini" clearable>
						<el-option v-for="(item,index) in select_4" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人:" v-if="filterOptions.drr">
					<el-select v-model="filterData.user_id" placeholder="请选择操作人" size="mini" clearable filterable>
						<el-option v-for="(item,index) in drr" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="打印状态:" v-if="filterOptions.dayin">
					<el-select v-model="filterData.print_state" placeholder="请选择状态" size="mini" clearable>
						<el-option v-for="(item,index) in dayin" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分账状态:" v-if="filterOptions.fenzhang">
					<el-select v-model="filterData.divide" placeholder="请选择状态" size="mini" clearable>
						<el-option v-for="(item,index) in fenzhang" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="考场分配状态:" v-if="filterOptions.fenpei">
					<el-select v-model="filterData.exam_region" placeholder="请选择考场分配状态" size="mini" clearable>
						<el-option v-for="(item,index) in kcfp" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="成绩:" v-if="filterOptions.chengji">
					<el-select v-model="filterData.exam_result" placeholder="请选择成绩" size="mini" clearable>
						<el-option v-for="(item,index) in chengji" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="准考证状态:" v-if="filterOptions.zkzzt">
					<el-select v-model="filterData.exam_number_state" placeholder="请选择准考证状态" size="mini" clearable>
						<el-option v-for="(item,index) in zkzzt" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="照片上传状态:" v-if="filterOptions.zpsc">
					<el-select v-model="filterData.photo" placeholder="请选择照片上传状态" size="mini" clearable>
						<el-option v-for="(item,index) in zpsc" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付状态:" v-if="filterOptions.pay">
					<el-select v-model="filterData.payment_state" placeholder="请选择支付状态" size="mini" clearable>
						<el-option v-for="(item,index) in zfzt" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付方式:" v-if="filterOptions.zhifufangshi">
					<el-select v-model="filterData.pay_plat" placeholder="请选择支付方式" size="mini" clearable>
						<el-option v-for="(item,index) in zhifufangshi" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报考渠道:" v-if="filterOptions.qudao">
					<el-select v-model="filterData.origin" placeholder="请选择报考渠道" size="mini" clearable>
						<el-option v-for="(item,index) in qudao" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事件:" v-if="filterOptions.shijian">
					<el-select v-model="filterData.shijian" placeholder="请选择事件" size="mini" clearable>
						<el-option v-for="(item,index) in shijian" :key="item.id" :label="item.title" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="日期:" v-if="filterOptions.date_scope" class="date-filter">
					<el-date-picker
						v-model="filterData.date_scope"
						type="daterange"
						align="right"
						size="mini"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="报考时间:" v-if="filterOptions.baokao" class="date-filter">
					<el-date-picker
						v-model="filterData.baokao"
						type="datetimerange"
						align="right"
						size="mini"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						:default-time="['00:00:00', '23:59:59']"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="缴费时间:" v-if="filterOptions.jiaofei" class="date-filter">
					<el-date-picker
						v-model="filterData.pay_time"
						type="datetimerange"
						align="right"
						size="mini"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						:default-time="['00:00:00', '23:59:59']"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="考试时间:" v-if="filterOptions.kaoshi" class="date-filter">
					<el-date-picker
						v-model="filterData.kaoshi"
						type="datetimerange"
						align="right"
						size="mini"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd HH:mm:ss"
						value-format="yyyy-MM-dd HH:mm:ss"
						:default-time="['00:00:00', '23:59:59']"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="查询周期:" v-if="filterOptions.date_filter" class="date-filter">
					<el-select v-model="filterData.year" placeholder="请选择年份" size="mini">
						<el-option v-for="(item,index) in years" :key="item" :label="item" :value="item"></el-option>
					</el-select>
					<el-select v-model="filterData.month" placeholder="请选择月份" size="mini">
						<el-option v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :class="open_btn_show?'btn':''" v-if="!sure">
					<el-button type="primary" size="mini" @click="getFilterData()">查 询</el-button>
					<el-button
						v-if="open_btn_show"
						type="primary"
						plain
						size="mini"
						@click="open = !open;btn_text = !open?'展开':'收起'"
						:icon="!open?'el-icon-arrow-down':'el-icon-arrow-up'"
					>{{btn_text}}</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button type="primary" size="mini" @click="getFilterData()">确 定</el-button>
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
// api
import {
	get_kaoci,
	get_pici,
	get_changci,
	get_select_2,
	get_kemu,
	get_cities,
	get_cbjg,
	get_operator,
	get_kaochang
} from "api/filterGroup/apis";
// css
import "components/filterGroupComponent/style.css";

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
				date_filter: false, // 按月按年筛选
				search: false, // 关键字搜索
				date_scope: false, // 日期选择范围
				select_1: false, // 状态(正常、冻结)
				select_2: false, // 用户组
				select_3: false, // 用户组
				select_4: false, // 附近上传用户
				zkzzt: false, // 准考证状态
				zpsc: false, // 照片上传状态
				drr: false, // 导入人
				kemu: false, // 科目
				shijian: false, // 事件
				jibie: false, // 级别
				chengji: false, // 成绩
				kaoci: false, // 考次
				pici: false, // 批次
				changci: false, // 场次
				fenpei: false, // 分配状态
				fenzhang: false, // 分账状态
				kaochang: false, // 考场查询
				baokao: false, // 报考时间
				kaoshi: false, // 考试时间
				jiaofei: false, // 缴费时间
				pinyin: false, // 拼音
				cities: false, //省市区
				cbjg: false, // 承办机构
				pay: false, // 支付状态
				zhifufangshi: false, // 支付方式
				qudao: false, // 报考渠道
				dayin: false, // 打印状态
				guoji: false, // 国籍
				minzu: false, // 民族
				stu: false // 考生管理页面
			},
			// 点击查询之后传到父级的筛选项数据
			filterData: {
				payment_state: "",
				exam_region: "",
				chengji: "",
				print_state: "",
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1
			},
			// 筛选项数组
			filter_arr: [],
			years: [],
			// 状态 （正常、冻结）
			select_1: [{ title: "正常", id: 1 }, { title: "冻结", id: -1 }],
			select_4: [],
			select_3: [
				{ title: "已开放", id: 1 },
				{ title: "未开放", id: -1 },
				{ title: "已删除", id: -2 }
			],
			fenzhang: [{ title: "已分账", id: 1 }, { title: "未分账", id: 0 }],
			// 用户组 （系统管理员、承办机构管理员）
			select_2: [],
			// 支付方式
			zhifufangshi: [
				{ title: "支付宝", id: 1 },
				{ title: "微信", id: 10 },
				{ title: "银联(个人网银)", id: 20 },
				{ title: "银联(企业网银)", id: 21 }
			],
			// 报考渠道
			qudao: [
				{ title: "后台单人报考", id: 1 },
				{ title: "后台批量报考", id: 2 },
				{ title: "PC端单人报考", id: 3 },
				{ title: "微信端报考", id: 4 }
			],
			// 承办机构
			cbjg: [],
			// 考场查询
			kaochang: [],
			// 支付状态
			zfzt: [{ title: "已支付", id: 1 }, { title: "未支付", id: 0 }],
			// 照片上传状态
			zpsc: [{ title: "已上传", id: 1 }, { title: "未上传", id: 0 }],
			// 导入人
			drr: [],
			// 考场分配状态
			kcfp: [{ title: "已分配", id: 1 }, { title: "未分配", id: 0 }],
			// 级别
			jb: [
				{ title: 1, id: 1 },
				{ title: 2, id: 2 },
				{ title: 3, id: 3 },
				{ title: 4, id: 4 },
				{ title: 5, id: 5 },
				{ title: 6, id: 6 },
				{ title: 7, id: 7 },
				{ title: 8, id: 8 },
				{ title: 9, id: 9 }
			],
			// 成绩
			chengji: [
				{ title: "全部合格(合格和降级合格)", id: 3 },
				{ title: "合格", id: 1 },
				{ title: "降级合格", id: 2 },
				{ title: "不合格", id: -1 },
				{ title: "缺考", id: -2 },
				{ title: "未录入", id: 0 }
			],
			// 事件
			shijian: [
				{ title: "修改", id: 0 },
				{ title: "删除", id: 1 },
				{ title: "新增", id: 2 }
			],
			// 科目
			kemu: [],
			// 考次
			kaoci: [],
			// 准考证状态
			zkzzt: [{ title: "已打印", id: 1 }, { title: "未打印", id: 0 }],
			// 批次
			pici: [],
			piciAll: [],
			// 拼音
			pinyin: [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"I",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"P",
				"Q",
				"R",
				"S",
				"T",
				"U",
				"V",
				"W",
				"X",
				"Y",
				"Z"
			],
			// 场次
			changci: [],
			changciAll: [],
			// 打印
			dayin: [{ title: "已打印", id: 1 }, { title: "未打印", id: 0 }]
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
		role() {
			return this.$store.state.role;
		}
	},
	created: function() {
		this.isCbjg = this.role === "承办单位";
		// 匹配显示
		for (let key in this.filterOptions) {
			for (let k in this.filterList) {
				if (this.filterList[k] == key) {
					this.filterOptions[key] = true;
				}
			}
		}
		this.filterOptions.drr && this.getOperator(); // 操作人
		this.filterOptions.kaoci && this.agentGetKaoci(); // 考次
		this.filterOptions.select_2 && this.getSelect_2(); // 用户组
		this.filterOptions.kemu && this.getKemu(); // 科目
		if (this.filterOptions.cbjg && !this.isCbjg) {
			// 如果是承办机构登录则不获取承办机构列表
			this.getCbjg(); // cbjg
		}
		if (
			this.$route.path ===
			"/pages/index/dataStatistics/dataStatistics_rank"
		) {
			// 如果是排行榜页面则默认筛选
			// 承办机构排行榜 年份
			// 从2018年开始算
			let this_year = new Date().getFullYear();
			let qujian = this_year - 2017;
			for (let i = 0; i < qujian; i++) {
				this.years.push(this_year - i);
			}
		} else {
			// 如果不是承办机构排行榜页面 则不需要传递这两个参数
			delete this.filterData.year;
			delete this.filterData.month;
		}
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
				// 筛选未支付数据
				if (that.$route.query.isPay === "0") {
					// 待付款
					Object.assign(homePageFilterObj, { payment_state: 0 });
				} else if (that.$route.query.isPay === "1") {
					Object.assign(homePageFilterObj, { payment_state: 1 });
				}
				if (that.$route.query.isPhoto === "1") {
					// 照片已上传
					Object.assign(homePageFilterObj, { photo: 1 });
				} else if (that.$route.query.isPhoto === "0") {
					Object.assign(homePageFilterObj, { photo: 0 });
				}
				if (that.$route.query.isExam === "1") {
					// 考场已分配
					Object.assign(homePageFilterObj, { exam_region: 1 });
				} else if (that.$route.query.isExam === "0") {
					// 考场未分配
					Object.assign(homePageFilterObj, { exam_region: 0 });
				}
				if (that.$route.query.isChengji === "0") {
					// 成绩未录入
					Object.assign(homePageFilterObj, { exam_result: 0 });
				}
				if (that.$route.query.isDayin === "0") {
					// 待颁发证书
					Object.assign(homePageFilterObj, { print_state: 0 });
				} else if (that.$route.query.isDayin === "1") {
					// 已颁发证书
					Object.assign(homePageFilterObj, { print_state: 1 });
				}
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
		// 承办机构用户登录获取考次 考场
		agentGetKaoci: function() {
			if (localStorage.getItem("mskj_agent_id")) {
				const data = {
					agent_id: localStorage.getItem("mskj_agent_id")
				};
				// 考次
				get_kaoci(data).then(res => {
					if (res.code === 200) {
						this.kaoci = res.data || [];
					}
				});
				this.getKaochang(data);
			}
		},
		//  切换承办机构获取 批次 考次 场次 考场
		getBatch: function(value) {
			let val = value;
			this.pici = [];
			this.kaoci = [];
			delete this.filterData.import_batch_id;
			delete this.filterData.season;
			const data = {
				agent_id: val
			};
			// 考次
			get_kaoci(data).then(res => {
				if (res.code === 200) {
					this.kaoci = res.data || [];
				}
			});
			// 批次
			get_pici(data).then(res => {
				if (res.code === 200) {
					let respon = res.data || [];
					this.piciAll = respon.data || [];
				}
			});
			// 场次
			get_changci(data).then(res => {
				if (res.code === 200) {
					let respon = res || [];
					this.changciAll = respon.data || [];
				}
			});
			this.getKaochang(data);
		},
		// 切换考次匹配批次、场次
		setBatch: function(val) {
			this.pici = [];
			this.changci = [];
			delete this.filterData.import_batch_id;
			delete this.filterData.batch_id;
			if (
				localStorage.getItem("mskj_agent_id") &&
				this.role === "承办单位"
			) {
				const data = {
					agent_id: localStorage.getItem("mskj_agent_id")
				};
				get_pici(data).then(res => {
					if (res.code === 200) {
						let respon = res.data || [];
						this.piciAll = respon.data || [];
						this.piciAll.map(item => {
							if (item.season_id == val) {
								this.pici.push(item);
							}
						});
					}
				});
				get_changci(data).then(res => {
					if (res.code === 200) {
						let respon = res || [];
						this.changciAll = respon.data || [];
						this.changciAll.map(item => {
							if (item && item.season_id == val) {
								this.changci.push(item);
							}
						});
					}
				});
			} else {
				this.piciAll.map(item => {
					if (item && item.season_id == val) {
						this.pici.push(item);
					}
				});
				this.changciAll.map(item => {
					if (item && item.season_id == val) {
						this.changci.push(item);
					}
				});
			}
		},
		// 用户组
		getSelect_2: function() {
			let data = {};
			if (
				this.$route.path === "/pages/index/userManage/userManage_system"
			) {
				data = { remove_agent: true };
			}
			if (this.role === "考级中心管理员") {
				data = { remove_admin: true, remove_agent: true };
			}
			get_select_2(data).then(res => {
				if (res.code === 200) {
					this.select_2 = res.data || [];
				}
			});
		},
		// 考场
		getKaochang: function(data) {
			get_kaochang(data).then(res => {
				if (res.code === 200) {
					this.kaochang = res.data || [];
				}
			});
		},
		// 科目
		getKemu: function() {
			get_kemu().then(res => {
				if (res.code === 200) {
					this.kemu = res.data || [];
				}
			});
		},
		// 操作人
		getOperator: function() {
			let data = {};
			if (
				localStorage.getItem("mskj_agent_id") &&
				this.role === "承办单位"
			) {
				data.agent_id = localStorage.getItem("mskj_agent_id");
			}
			get_operator(data).then(res => {
				if (res.code === 200) {
					this.drr = res.data || [];
				}
			});
		},
		// 承办机构
		getCbjg: function() {
			get_cbjg().then(res => {
				if (res.code === 200) {
					this.cbjg = res.data || [];
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
					} else if (key === "kaoshi") {
						// 拆分数组
						const [exam_start_time, exam_end_time] = obj[key];
						Object.assign(
							obj,
							{ exam_start_time },
							{ exam_end_time }
						);
					} else if (key === "baokao") {
						// 拆分数组
						const [sign_start_time, sign_end_time] = obj[key];
						Object.assign(
							obj,
							{ sign_start_time },
							{ sign_end_time }
						);
					} else if (key === "pay_time") {
						// 拆分数组
						const [pay_start_time, pay_end_time] = obj[key];
						Object.assign(
							obj,
							{ pay_start_time },
							{ pay_end_time }
						);
					} else if (
						key === "agent_id" &&
						this.filterOptions.cities
					) {
						// 如果有承办机构筛选项，则不需要区域筛选（承办机构关联区域）
						// 主动清空城市选择器  此处clearValue需要传入一个事件对象 这里是自己模拟一个事件对象来避免报错
						let obj = {};
						obj.stopPropagation = () => {};
						this.$refs.district_dom.clearValue(obj);
						delete obj.district_id;
					}
				}
			}
			// 当不存在报考 考试 日期筛选项时，移除下列字段
			if (!obj.hasOwnProperty("baokao")) {
				delete obj.sign_start_time;
				delete obj.sign_end_time;
			}
			if (!obj.hasOwnProperty("kaoshi")) {
				delete obj.exam_start_time;
				delete obj.exam_end_time;
			}
			if (!obj.hasOwnProperty("pay_time")) {
				delete obj.pay_start_time;
				delete obj.pay_end_time;
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
				case "pinyin":
					item.title = "拼音";
					item.value = val;
					break;
				case "agent_id":
					item.title = "承办机构";
					item.value = this.arrayMapFilter(this.cbjg, val).title;
					break;
				case "photo":
					item.title = "照片上传状态";
					item.value = this.arrayMapFilter(this.zpsc, val).title;
					break;
				case "state":
					item.title = "状态";
					item.value = this.arrayMapFilter(this.select_1, val).title;
					break;
				case "country_id":
					item.title = "国籍";
					item.value = this.arrayMapFilter(this.guoji, val).title;
					break;
				case "nation_id":
					item.title = "民族";
					item.value = this.arrayMapFilter(this.minzu, val).title;
					break;
				case "season":
					item.title = "考次";
					item.value = this.arrayMapFilter(this.kaoci, val).title;
					break;
				case "import_batch_id":
					item.title = "批次";
					item.value = this.arrayMapFilter(this.pici, val).title;
					break;
				case "batch_id":
					item.title = "场次";
					item.value = this.arrayMapFilter(this.changci, val).title;
					break;
				case "rank":
					item.title = "级别";
					item.value = this.arrayMapFilter(this.jb, val).title;
					break;
				case "kaochang":
					item.title = "考场";
					item.value = this.arrayMapFilter(this.kaochang, val).title;
					break;
				case "user_id":
					item.title = "操作人";
					item.value = this.arrayMapFilter(this.drr, val).name;
					break;
				case "exam_region":
					item.title = "考场分配状态";
					item.value = this.arrayMapFilter(this.kcfp, val).title;
					break;
				case "select_3":
					item.title = "考场状态";
					item.value = this.arrayMapFilter(this.select_3, val).title;
					break;
				case "exam_result":
					item.title = "成绩";
					item.value = this.arrayMapFilter(this.chengji, val).title;
					break;
				case "exam_number_state":
					item.title = "准考证状态";
					item.value = this.arrayMapFilter(this.zkzzt, val).title;
					break;
				case "role":
					item.title = "用户组";
					item.value = this.arrayMapFilter(this.select_2, val).title;
					break;
				case "subject_id":
					item.title = "科目";
					item.value = this.arrayMapFilter(this.kemu, val).title;
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
				case "divide":
					item.title = "分账状态";
					item.value = this.arrayMapFilter(this.fenzhang, val).title;
					break;
				case "print_state":
					item.title = "打印状态";
					item.value = this.arrayMapFilter(this.dayin, val).title;
					break;
				case "origin":
					item.title = "报考渠道";
					item.value = this.arrayMapFilter(this.qudao, val).title;
					break;
				case "select_4":
					item.title = "用户";
					item.value = this.arrayMapFilter(this.select_4, val).title;
					break;
				case "shijian":
					item.title = "事件";
					item.value = this.arrayMapFilter(this.shijian, val).title;
					break;
				case "date_scope":
					item.title = "日期";
					item.value = `${val[0]} - ${val[1]}`;
					break;
				case "year":
					item.title = "统计年";
					item.value = val;
					break;
				case "month":
					item.title = "统计月";
					item.value = val;
					break;
				case "baokao":
					item.title = "报考时间";
					item.value = `${val[0]} - ${val[1]}`;
					break;
				case "kaoshi":
					item.title = "考试时间";
					item.value = `${val[0]} - ${val[1]}`;
					break;
				case "pay_time":
					item.title = "缴费时间";
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
			if (item.key == "agent_id") {
				// 清除承办机构筛选时 同时清除关联的考次 批次 场次
				this.kaoci = [];
				this.pici = [];
				this.changci = [];
				delete this.filterData["agent_id"];
				delete this.filterData["season"];
				delete this.filterData["import_batch_id"];
				delete this.filterData["batch_id"];
			} else if (item.key == "season") {
				// 清除考次筛选时 同时清除关联的批次 场次
				this.pici = [];
				this.changci = [];
				delete this.filterData["season"];
				delete this.filterData["import_batch_id"];
				delete this.filterData["batch_id"];
			} else if (item.key == "district_id") {
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
			if (this.role === "系统管理员" || this.role === "考级中心管理员") {
				this.kaoci = [];
			}
			this.pici = [];
			this.changci = [];
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
