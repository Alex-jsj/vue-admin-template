<template>
    <div id="trend">
        <div class="title-box">
            <span class="title float-left">{{$t('home.trend')}}</span>
            <router-link to="/pages/board" target="_blank" class="board">
                <el-button type>{{$t('home.dataBoard')}}</el-button>
            </router-link>
            <p class="date">{{$t('home.QueryTime')}}：{{start_date}} {{$t('base.to')}} {{end_date}}</p>
        </div>
        <!-- content -->
        <div class="echarts">
            <span class="no-data" v-show="!data[0]">{{$t('base.noData')}}</span>
            <div id="echart-bar" :class="{'canShow':data[0]}"></div>
        </div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
    name: "trend",
    data() {
        return {
            // 查询时间
            start_date: "",
            end_date: ""
        };
    },
    props: {
        data: Array
    },
    watch: {
        listenMenuCollapse() {
            // 动态变化canvas宽度
            setTimeout(function() {
                echarts.init(document.getElementById("echart-bar")).resize();
            }, 500);
        },
        listenContentWidthType() {
            // 动态变化canvas宽度
            setTimeout(function() {
                echarts.init(document.getElementById("echart-bar")).resize();
            }, 500);
        },
        listenMenuType() {
            // 动态变化canvas宽度
            setTimeout(function() {
                echarts.init(document.getElementById("echart-bar")).resize();
            }, 500);
        },
        trend_title() {
            let chart = echarts.init(document.getElementById("echart-bar"));
            chart.clear();
            this.the_chart();
        }
    },
    computed: {
        // 菜单是否收起
        listenMenuCollapse() {
            return this.$store.state.menuCollapse;
        },
        // 菜单模式
        listenMenuType() {
            return this.$store.state.menuType;
        },
        // 页面宽度
        listenContentWidthType() {
            return this.$store.state.contentWidthType;
        },
        trend_title() {
            return {
                data1: this.$t("home.canvas.data1"),
                data2: this.$t("home.canvas.data2"),
                data3: this.$t("home.canvas.data3")
            };
        }
    },
    created: function() {
        // 报考趋势时间范围(当前月份)
        this.scope();
    },
    mounted() {
        // init
        this.$nextTick(() => {
            this.data[0] && this.the_chart();
        });
    },
    methods: {
        // 趋势echart
        the_chart: function() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("echart-bar"));
            const that = this;
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let dates = [];
            let list = JSON.parse(JSON.stringify(that.data));
            list.map(item => {
                data1.push(item.data1);
                data2.push(item.data2);
                data3.push(item.data3);
                dates.push(item.day);
            });
            // 图表配置
            myChart.setOption({
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: [
                        this.trend_title.data1,
                        this.trend_title.data2,
                        this.trend_title.data3
                    ]
                },
                grid: {
                    left: "1%",
                    right: "1%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    // boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    data: dates
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dotted"
                        }
                    }
                },
                series: [
                    {
                        name: this.trend_title.data1,
                        type: "line",
                        symbolSize: 7, //拐点圆的大小
                        data: data1,
                        smooth: 0.3, // 折线弧度
                        itemStyle: {
                            normal: {
                                color: "#4771FF",
                                label: {
                                    show: true,
                                    position: "top"
                                }
                            }
                        }
                    },
                    {
                        name: this.trend_title.data2,
                        type: "line",
                        symbolSize: 7, //拐点圆的大小
                        data: data2,
                        smooth: 0.3, // 折线弧度
                        itemStyle: {
                            normal: {
                                color: "#f3566f",
                                label: {
                                    show: true,
                                    position: "top"
                                }
                            }
                        }
                    },
                    {
                        name: this.trend_title.data3,
                        type: "line",
                        symbolSize: 7, //拐点圆的大小
                        data: data3,
                        smooth: 0.3, // 折线弧度
                        itemStyle: {
                            normal: {
                                color: "#E6A23C",
                                label: {
                                    show: true,
                                    position: "top"
                                }
                            }
                        }
                    }
                ]
            });
            var timer = null;
            window.addEventListener("resize", function() {
                // 防抖处理
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    myChart.resize();
                }, 200);
            });
        },
        // 报考趋势时间范围(当前月份)
        scope: function() {
            let year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            month < 10 ? (month = "0" + month) : month;
            let day = new Date().getDate();
            day < 10 ? (day = "0" + day) : day;
            // 赋值
            this.start_date = `${year}-${month}-01`;
            this.end_date = `${year}-${month}-${day}`;
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
#trend {
    width: 100%;
    height: 400px;
    border: 1px solid #edeef1;
    margin-top: 0.875rem;
    background: #fff;
    .echarts {
        width: 100%;
        height: calc(~"100% - 40px - 10px");
        position: relative;
        margin-top: 10px;
        .no-data {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            color: @grey;
        }
        #echart-bar {
            width: 100%;
            height: 350px;
            opacity: 0;
            &.canShow {
                opacity: 1;
            }
        }
    }
}
</style>
