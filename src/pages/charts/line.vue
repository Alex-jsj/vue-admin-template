<template>
    <div class="echarts">
        <span class="no-data" v-show="!linedata[0]">{{$t('base.noData')}}</span>
        <div id="echart-bar" :class="{'canShow':linedata[0]}"></div>
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
    name: "chartLine",
    data() {
        return {
            linedata: [
                {
                    data1: 15,
                    data2: 5,
                    data3: 27,
                    day: "2018/03/01"
                },
                {
                    data1: 7,
                    data2: 25,
                    data3: 1,
                    day: "2018/03/02"
                },
                {
                    data1: 34,
                    data2: 14,
                    data3: 23,
                    day: "2018/03/03"
                },
                {
                    data1: 23,
                    data2: 23,
                    data3: 12,
                    day: "2018/03/04"
                },
                {
                    data1: 65,
                    data2: 2,
                    data3: 45,
                    day: "2018/03/05"
                },
                {
                    data1: 12,
                    data2: 5,
                    data3: 23,
                    day: "2018/03/06"
                },
                {
                    data1: 23,
                    data2: 53,
                    data3: 56,
                    day: "2018/03/07"
                }
            ]
        };
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
    mounted() {
        // init
        this.$nextTick(() => {
            this.linedata[0] && this.the_chart();
        });
    },
    methods: {
        the_chart: function() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("echart-bar"));
            const that = this;
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let dates = [];
            let list = JSON.parse(JSON.stringify(that.linedata));
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
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mixin.less";
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
</style>
