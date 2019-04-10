<template>
    <div class="echarts">
        <div id="echart-bar"></div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
    name: "chartBar",
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
        }
    },
    mounted() {
        // init
        this.$nextTick(() => {
            this.the_chart();
        });
    },
    methods: {
        the_chart: function() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("echart-bar"));
            var xData = (function() {
                var data = [];
                for (var i = 1; i < 13; i++) {
                    data.push(i + "月份");
                }
                return data;
            })();
            // 图表配置
            myChart.setOption({
                backgroundColor: "#344b58",
                title: {
                    text: "本年商场顾客男女人数统计",
                    subtext: "BY Wang Dingding",
                    x: "4%",

                    textStyle: {
                        color: "#fff",
                        fontSize: "22"
                    },
                    subtextStyle: {
                        color: "#90979c",
                        fontSize: "16"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        textStyle: {
                            color: "#fff"
                        }
                    }
                },
                grid: {
                    borderWidth: 0,
                    top: 110,
                    bottom: 95,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    x: "4%",
                    top: "11%",
                    textStyle: {
                        color: "#90979c"
                    },
                    data: ["女", "男", "平均"]
                },

                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            lineStyle: {
                                color: "#90979c"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0
                        },
                        data: xData
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#90979c"
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0
                        },
                        splitArea: {
                            show: false
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        height: 30,
                        xAxisIndex: [0],
                        bottom: 30,
                        start: 10,
                        end: 80,
                        handleIcon:
                            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        handleSize: "110%",
                        handleStyle: {
                            color: "#d3dee5"
                        },
                        textStyle: {
                            color: "#fff"
                        },
                        borderColor: "#90979c"
                    },
                    {
                        type: "inside",
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ],
                series: [
                    {
                        name: "女",
                        type: "bar",
                        stack: "总量",
                        barMaxWidth: 35,
                        barGap: "10%",
                        itemStyle: {
                            normal: {
                                color: "rgba(255,144,128,1)",
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff"
                                    },
                                    position: "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? p.value : "";
                                    }
                                }
                            }
                        },
                        data: [
                            709,
                            1917,
                            2455,
                            2610,
                            1719,
                            1433,
                            1544,
                            3285,
                            5208,
                            3372,
                            2484,
                            4078
                        ]
                    },

                    {
                        name: "男",
                        type: "bar",
                        stack: "总量",
                        itemStyle: {
                            normal: {
                                color: "rgba(0,191,183,1)",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? p.value : "";
                                    }
                                }
                            }
                        },
                        data: [
                            327,
                            1776,
                            507,
                            1200,
                            800,
                            482,
                            204,
                            1390,
                            1001,
                            951,
                            381,
                            220
                        ]
                    },
                    {
                        name: "总数",
                        type: "line",
                        stack: "总量",
                        symbolSize: 10,
                        symbol: "circle",
                        itemStyle: {
                            normal: {
                                color: "rgba(252,230,48,1)",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? p.value : "";
                                    }
                                }
                            }
                        },
                        data: [
                            1036,
                            3693,
                            2962,
                            3810,
                            2519,
                            1915,
                            1748,
                            4675,
                            6209,
                            4323,
                            2865,
                            4298
                        ]
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
        height: 600px;
        opacity: 1;
    }
}
</style>
