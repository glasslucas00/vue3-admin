import { FormColumnType } from "@/components/base-form";
import { FormTypeEnum } from "@/enums/componentEnum";
// import { Column } from "@/components/base-table/src/types";
import { getAllRoleList } from "@/api/system/role";
import { StatusData } from "@/constant/basic";
import { useStationStoreWithOut } from "@/stores/modules/station";
import type { EChartsOption } from "echarts";
import echarts from "@/plugins/echarts";
const colors = ["#5470C6", "#EE6666", "#EE6666"];
export const BarOptions: any = ref({
    tooltip: {
        axisPointer: {
            type: "cross"
        },
        trigger: "axis",
        position: function (pt: any[]) {
            return [pt[0], "10%"];
        }
    },
    grid: {
        top: "10%",
        bottom: "10%"
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: "none"
            },
            dataView: { show: true, readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },
    // dataZoom: [
    //     {
    //         type: "inside",
    //         start: 0,
    //         end: 100
    //     },
    //     {
    //         start: 0,
    //         end: 10
    //     }
    // ],
    xAxis: [
        {
            data: ["2016", "2017", "2018", "2019"]
        }
    ],
    series: [
        {
            name: "导高异常",
            type: "bar",
            stack: "PC",
            data: [1500, 2800, 3500, 2900],
            barWidth: "12",
            barGap: "20%",
            itemStyle: {
                color: "#5171fd"
            }
        },
        {
            name: "拉出值异常",
            type: "bar",
            stack: "PC",
            data: [700, 600, 550, 420],
            barWidth: "12",
            barGap: "20%",
            itemStyle: {
                color: "#3dadf6"
            }
        },
        {
            name: "磨耗异常",
            type: "bar",
            stack: "mobile",
            data: [1600, 2300, 2800, 3300],
            barWidth: "12",
            barGap: "20%",
            itemStyle: {
                color: "#ea677c"
            }
        },
        {
            name: "燃弧异常",
            type: "bar",
            stack: "mobile",
            data: [1600, 2800, 3500, 2000],
            barWidth: "12",
            barGap: "20%",
            itemStyle: {
                color: "#ef9b5f"
            }
        }
    ]
});

export const LineBarOptions: any = ref({
    color: colors,
    grid: {
        top: "10%",
        bottom: "10%",
        right: "5%"
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross"
        }
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: "none"
            },
            dataView: { show: true, readOnly: false },
            restore: {},
            saveAsImage: {}
        }
    },

    xAxis: [
        {
            type: "category",
            axisTick: {
                alignWithLabel: true
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    ],
    yAxis: [
        {
            type: "value",
            name: "燃弧次数",
            position: "left",
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: "{value} 次"
            }
        },
        {
            type: "value",
            name: "燃弧率",
            position: "right",
            alignTicks: true,
            offset: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: "{value} %"
            }
        }
    ],
    series: [
        {
            name: "燃弧次数",
            type: "bar",
            barWidth: "20",
            color: colors[0],
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: "燃弧率",
            type: "line",
            color: colors[1],
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }
    ]
});

export type BasicType = {
    label: number | string;
    value: number | string;
};
export const StationData: BasicType[] = useStationStoreWithOut().StationList;
export const DirectionData: BasicType[] = [
    {
        label: "上行",
        value: 1
    },
    {
        label: "下行",
        value: -1
    }
];
export const WarmTypes: BasicType[] = [
    {
        label: "导高异常",
        value: 1
    },
    {
        label: "拉出值异常",
        value: 2
    },
    {
        label: "磨耗异常",
        value: 3
    },
    {
        label: "燃弧异常",
        value: 10
    },
    {
        label: "温度异常",
        value: 11
    }
];
export const WarmLevel: BasicType[] = [
    {
        label: "一级",
        value: 1
    },
    {
        label: "二级",
        value: 2
    },
    {
        label: "三级",
        value: 3
    }
];

// console.log(counterStore.StationList);

export const FormColumn: FormColumnType[] = [
    {
        fieldName: "type",
        fieldDesc: "告警类型",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: WarmTypes,
            multiple: true
        }
    },
    {
        fieldName: "timestamp",
        fieldDesc: "日期选择",
        fieldType: FormTypeEnum.DATER
    },

    {
        fieldName: "id_station_pre",
        fieldDesc: "起始站",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: StationData
        }
    },
    {
        fieldName: "id_station_next",
        fieldDesc: "截至站",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: StationData
        }
    },
    {
        fieldName: "direction",
        fieldDesc: "方向",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: DirectionData,
            multiple: true
        }
    },
    {
        fieldName: "level",
        fieldDesc: "告警等级",
        fieldType: FormTypeEnum.SELECT,
        config: {
            options: WarmLevel,
            multiple: true
        }
    },
    {
        fieldName: "distance",
        fieldDesc: "距离",
        fieldType: FormTypeEnum.INPUT
    }
    // {
    //     fieldName: "role",
    //     fieldDesc: "ApiSelect",
    //     fieldType: FormTypeEnum.SELECT,
    //     config: {
    //         api: getAllRoleList,
    //         labelKey: "roleName",
    //         valueKey: "role"
    //     }
    // },

    // {
    //     fieldName: "slot",
    //     fieldDesc: "自定义slot",
    //     fieldType: FormTypeEnum.SLOT
    // }
];
