<template>
    <div class="com-echarts-line-container hidden">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="点击加载图表" name="1">
                <!-- <el-button @click="load">加载</el-button> -->
                <base-box v-custom-loading="loading" :loading-full="full" title="" class="dark-bg">
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <div class="chartSection" ref="chart1"></div>
                        </el-col>
                    </el-row>
                </base-box>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import { searchMeasChart } from "@/api/info";
import { processChartsData, setChartsSeries } from "./fun";
// import {LineOptions} from "./column"
import * as echarts from "echarts";
// vue3 引入对应功能
import { ref, reactive } from "vue";
import { loadStationStore } from "@/utils/storage";
import { useLoading } from "@/hooks";

const loading = ref(false);
const full = ref(false);
const colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#8085e8", "#8d4653", "#91e8e1"];
const LineOptions = {
    grid: {
        // width: "auto"
        left: 200,
        right: 220
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross"
        }
        // formatter :'{a}:{c}mm'
        // position: function(pt) {
        //   return [pt[0], "10%"];
        // }
    },
    title: {
        left: "center",
        text: "弓网测量数据",
        top: 20
    },
    legend: {
        data: ["磨耗", "温度", "拉出值", "导高", "导线残高", "双线距离", "True导高", "True拉出值", "杆号"]
    },
    toolbox: {
        feature: {
            dataZoom: {},
            // restore: {},
            // saveAsImage: {},
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    xAxis: {
        type: "value",
        boundaryGap: false,
        splitLine: { show: false },
        name: "距离",
        nameLocation: "center",
        min: "dataMin",
        max: "dataMax"
    },
    yAxis: [
        {
            type: "value",
            name: "磨耗",
            position: "left",
            min: 0,
            max: 14,
            splitLine: { show: false },
            // alignTicks: true,
            offset: 5,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: "{value}mm"
                // valueFormatter: (value: number) => "$" + value.toFixed(2)
            }
        },
        {
            type: "value",
            name: "温度",
            position: "left",
            min: 0,
            max: 60,
            // alignTicks: true,
            offset: 70,
            splitLine: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: "{value}°C"
            }
        },
        {
            type: "value",
            name: "拉出值",
            position: "left",
            min: -300,
            max: 500,
            splitLine: { show: false },
            // alignTicks: true,
            offset: 120,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: "{value}mm"
                // valueFormatter: (value: number) => "$" + value.toFixed(2)
            }
        },
        {
            type: "value",
            name: "导高",
            min: 3500,
            max: 4250,
            splitLine: { show: false },
            position: "right",
            alignTicks: true,
            offset: 30,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[3]
                }
            },
            axisLabel: {
                formatter: "{value}mm"
            }
        },
        {
            type: "value",
            name: "导线残高",
            position: "right",
            alignTicks: true,
            offset: 100,
            min: 0,
            max: 15,
            splitLine: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[4]
                }
            },
            axisLabel: {
                formatter: "{value}mm"
            }
        },
        {
            type: "value",
            name: "双线距离",
            position: "right",
            alignTicks: true,
            offset: 150,
            min: 50,
            max: 1500,
            splitLine: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[5]
                }
            },
            axisLabel: {
                formatter: "{value} mm"
            }
        }
    ],
    dataZoom: [
        {
            type: "inside",
            start: 0,
            end: 30
        },
        {
            start: 0,
            end: 10
        }
    ],
    series: [
        {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            // itemStyle: {
            //   color: "rgb(255, 70, 131)"
            // },
            // areaStyle: {
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: "rgb(255, 158, 68)"
            //     },
            //     {
            //       offset: 1,
            //       color: "rgb(255, 70, 131)"
            //     }
            //   ])
            // },
            data: [
                [1, 2],
                [2, 3]
            ]
        }
    ]
};
const chart1: any = ref(null);

const getChartsData = async () => {
    // const data = ;
    const searchForm = loadStationStore("MeasSearchForm");
    await searchMeasChart(searchForm).then((value: any) => {
        // Data.value =processItems(value.data.items) ;

        const chartDatas = value.data.chartDatas;
        // console.log(value.data.chartDatas);

        const chartsSeries = processChartsData(chartDatas);
        // processTrueData(truedata, chartsDatas);

        const dataSeries = setChartsSeries(chartsSeries);
        LineOptions.series = dataSeries;
        console.log(LineOptions.series);
        chart();
        loading.value = false;

        // console.log(value.data);
        // MetroStore.MetroName=selectvalue.value;
        // console.log('select metro:',MetroStore.MetroName);
        // console.log(options);
    });
};
const chart = () => {
    // 解决echarts在vue中切换到其他页面再返回来就不显示的问题
    chart1.value.setAttribute("_echarts_instance_", "");
    // 这里使用chart1.value的形式获取到dom节点
    const myChart = echarts.init(chart1.value);

    // 绘制图表
    myChart.setOption(LineOptions);

    // echarts 自适应，如果dom元素是自适应高宽，会随之改变echarts大小
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};

const activeNames = ref(["0"]);
const handleChange = (val: string[]) => {
    if (val.length > 1) {
        console.log(val);
        loading.value = true;
        load();
    }
};
const load = async () => {
    await getChartsData();
};
onMounted(() => {
    chart();
});
</script>

<style lang="scss" scoped>
.chartSection {
    /* width: 1500; */
    height: 800px;
    //   background-color: #fff;
    //   border-radius: 5px;
    //   border: 1px solid #ccc;
}
</style>
