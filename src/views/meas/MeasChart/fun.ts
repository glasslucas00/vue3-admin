import { searchMeasChart } from "@/api/info";
import { useStationStoreWithOut } from "@/stores/modules/station";
import { LineOptions } from "./column";

const colors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#8085e8", "#8d4653", "#91e8e1"];

export const processChartsData = (chartsData: any) => {
    const chartsDatas = [];
    for (let i = 0; i < 9; i++) {
        chartsDatas[i] = [];
    }
    chartsDatas[0] = chartsData.abrasion;
    chartsDatas[1] = chartsData.temp;
    chartsDatas[2] = chartsData.stagger;
    chartsDatas[3] = chartsData.height;
    chartsDatas[4] = chartsData.abrasion_other;
    chartsDatas[5] = chartsData.stagger_other;
    chartsDatas[6] = chartsData.anchorHeight;
    chartsDatas[7] = chartsData.anchorStagger;
    chartsDatas[8] = chartsData.anchorName.map((x: any) => {
        return {
            xAxis: x[0], // 对于x轴中的一个值,
            label: {
                show: true, // 是否展示文字
                color: "#b1b3b8",
                fontSize: 12,
                formatter: x[1]
            },
            lineStyle: {
                color: "#b1b3b8",
                width: 1, // 0 的时候可以隐藏线
                type: "dashed" // 实线，不写默认虚线
            }
        };
    });
    return chartsDatas;
};

export const setChartsSeries = (chartsDatas: any) => {
    const dataSeries = [] as any;
    dataSeries[0] = {
        name: "磨耗",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 0,
        color: colors[0],
        data: chartsDatas[0]
        //  dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m, x.abrasion);
        // })
    };
    dataSeries[1] = {
        name: "温度",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 1,
        color: colors[1],
        data: chartsDatas[1]
        // dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m, x.temperature_avg);
        // })
    };
    dataSeries[2] = {
        name: "拉出值",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 2,
        color: colors[2],
        data: chartsDatas[2]
        // dataMap.list.map(x => {
        //   return [x.distance_from_last_station_m,x.stagger);
        // })
    };
    dataSeries[3] = {
        name: "导高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 3,
        color: colors[3],
        data: chartsDatas[3]
    };
    // console.log('dataSeries[3]',dataSeries[3] );

    dataSeries[4] = {
        name: "导线残高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 4,
        color: colors[4],
        data: chartsDatas[4]
    };
    dataSeries[5] = {
        name: "双线距离",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 5,
        color: colors[5],
        data: chartsDatas[5]
    };

    dataSeries[6] = {
        name: "True导高",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 3,
        color: colors[6],
        data: chartsDatas[6]
    };
    dataSeries[7] = {
        name: "True拉出值",
        tooltip: {
            formatter: "{c1}mm"
        },
        type: "line",
        symbol: "none",
        yAxisIndex: 2,
        color: colors[8],
        data: chartsDatas[7]
    };
    dataSeries[8] = {
        name: "杆号",
        type: "line", // 如果将 markLine 单独写在一个对象里，就必须加 type ，不然报错。
        markLine: {
            symbol: "none", // 相当于["none", "none"] [虚线，没有箭头]
            silent: true, // true 不响应鼠标事件
            data: chartsDatas[8]
        }
    };
    return dataSeries;
};
