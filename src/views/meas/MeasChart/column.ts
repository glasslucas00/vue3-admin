import echarts from "@/plugins/echarts";
import type { EChartsOption } from "echarts";

const colors = [
    "#28CAD8",
    "#E5A214",
    "#F69F73",
    "#ff7f50",
    "#87cefa",
    "#da70d6",
    "#32cd32",
    "#6495ed",
    "#ff69b4",
    "#cd5c5c",
    "#1e90ff",
    "#ff6347",
    "#7b68ee",
    "#6b8e23",
    "#4ea397",
    "#b8860b",
    "#7bd9a5"
];
export const LineOptions = {
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
            dataZoom: {
                yAxisIndex: "none"
            },
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
        name: "距离",
        nameLocation: "center"
    },
    yAxis: [
        {
            type: "value",
            name: "磨耗",
            position: "left",
            min: 0,
            max: 14,
            // alignTicks: true,
            offset: 5,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: "{value}mm",
                valueFormatter: (value: number) => "$" + value.toFixed(2)
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
            // alignTicks: true,
            offset: 120,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: "{value}mm",
                valueFormatter: (value: number) => "$" + value.toFixed(2)
            }
        },
        {
            type: "value",
            name: "导高",
            min: 3500,
            max: 4200,
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
            max: 14,
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
            max: 2000,
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
            data: [
                [1, 2],
                [2, 3]
            ]
        }
    ]
};

const imgList = [
    "https://i.328888.xyz/2023/02/28/zZUaU.gif",
    "https://i.328888.xyz/2023/02/28/zZDep.gif",
    "https://i.328888.xyz/2023/02/28/zZtkv.gif",
    "https://i.328888.xyz/2023/02/28/zZWB3.gif",
    "https://i.328888.xyz/2023/02/28/zZkJy.gif",
    "https://i.328888.xyz/2023/02/28/zZCA5.gif",
    "https://i.328888.xyz/2023/02/28/zZlr8.gif",
    "https://i.328888.xyz/2023/02/28/zZw5Z.gif",
    "https://i.328888.xyz/2023/02/28/zZHZF.gif",
    "https://i.328888.xyz/2023/02/28/zZOOH.gif",
    "https://i.328888.xyz/2023/02/28/zZbeQ.gif",
    "https://i.328888.xyz/2023/02/28/zZjaE.gif",
    "https://i.328888.xyz/2023/02/28/zZI0C.gif",
    "https://i.328888.xyz/2023/02/28/zZNBP.gif",
    "https://i.328888.xyz/2023/02/28/zZrJX.gif",
    "https://i.328888.xyz/2023/02/28/zZRDt.jpeg",
    "https://i.328888.xyz/2023/02/28/zZcrJ.jpeg",
    "https://i.328888.xyz/2023/02/28/zZm5c.jpeg"
];

export const seriesMapOptions: EChartsOption = {};
